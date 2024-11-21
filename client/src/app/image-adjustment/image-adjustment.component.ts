import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
//use the DomSanitizer to trust the resource URL.
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';


@Component({
  selector: 'app-image-adjustment',
  templateUrl: './image-adjustment.component.html',
  styleUrls: ['./image-adjustment.component.scss']
})
export class ImageAdjustmentComponent implements OnInit {
  public image: string | null = null; // Image data from the previous page
  public croppedWidth: number = 0; // Cropped image width
  public croppedHeight: number = 0; // Cropped image height
  public croppedImage: string | null = null;
  public pdfBase64: string | null = null;
  public pdfUrl: SafeResourceUrl | null = null; // URL for PDF preview
  public pdfBlob?: Blob;
  public isLoading: boolean = false;
  public isPdfFile: boolean = false; 
  public isImageFile: boolean = false; 
  public renderedPdfImages: string[] = []; // array of strings, which will hold the Base64-encoded image URLs.
  public extractedText: string[] = []; // Array to store extracted text from each image
  

  constructor(
    private http: HttpClient,
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
   
    ) {
    // Set the workerSrc to the imported worker script
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs';  
  }
 
  ngOnInit(): void {
    const navigation = window.history.state;
    console.log('Navigation state:', navigation);
  
    if (navigation?.['image']) {
      this.isImageFile = true;
      this.image = navigation['image'];
      console.log('Received image Data URL:', this.image);
    } else if (navigation?.['pdfFile']) {
      this.isPdfFile = true;
      const pdfBase64 = navigation['pdfFile']; // Get the Base64 PDF data
      // Convert the Base64 string to a Blob
      const pdfBlob = this.base64ToBlob(pdfBase64, 'application/pdf');
      this.displayPdf(pdfBlob);
    } else {
      console.error('No valid file detected in navigation state.')
    }
  }
  
  onCroppedImage(event: ImageCroppedEvent): void {
    console.log('Cropped Event:', event);
    if (event?.base64) {
      this.image = event.base64; // Replace original image with cropped image
      this.croppedWidth = event.width;
      this.croppedHeight = event.height;
      console.log('Updated image with cropped Base64:', this.image);
    } else if (event?.blob) {
      // If base64 is missing, convert Blob to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        this.image = reader.result as string; // Replace the image with the Base64 from the Blob
        console.log('Cropped image Base64 generated:', this.image);
      };
      reader.readAsDataURL(event.blob);
    } else {
      console.error('Cropped image event received null data.');
    }
  }

  onImageLoaded(): void {
    console.log('Image successfully loaded into the cropper.');
  }

  onLoadImageFailed(): void {
    console.error('Failed to load image into the cropper.');
  }
  
  // Helper method to convert Base64 to Blob
  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]); // Remove Base64 header
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i));;
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: mimeType });
  }

  // Display PDF in an iframe
  private displayPdf(pdfBlob: Blob): void {
    console.log('PDF Blob:', pdfBlob);    
    // Sanitize the URL before binding to the iframe
    const fileURL = URL.createObjectURL(pdfBlob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    console.log('Sanitized PDF URL:', this.pdfUrl);
    this.renderPdfAsImages(pdfBlob);
  }

  private async renderPdfAsImages(pdfBlob: Blob): Promise<void> {
    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(pdfBlob));
    
    try {
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
  
      // Loop through all the pages and render them as images
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum);  
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
          const viewport = page.getViewport({ scale: 2 }); // Adjust scale for better image resolution
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          // Render the page to the canvas
          await page.render({ canvasContext: context, viewport }).promise;
          
          // Convert canvas to Base64 image
          const imgData = canvas.toDataURL('image/png');
          this.renderedPdfImages.push(imgData); // Store image data (Base64 PNG)
          console.log(`Page ${pageNum} rendered as image:`, imgData);
        }
      }
      console.log('Generated images:', this.renderedPdfImages);
    } catch (error) {
      console.error('Error rendering PDF pages:', error);
    }
  }

  async confirm() {
  
    this.isLoading = true; 

    try {
      // Handle image files
      if (this.isImageFile && this.image) {
        console.log('Extracting text from image...');
        const text = await this.sendImageToApi(this.image);
        this.extractedText.push(text);
      } else if (this.isPdfFile && this.renderedPdfImages.length > 0) {
        console.log('Extracting text from PDF pages...');
        for (const pageImage of this.renderedPdfImages) {
          const text = await this.sendImageToApi(pageImage);
          this.extractedText.push(text);
        }
      } else {
        throw new Error('No valid file to process.');      
      }

      console.log('Extracted text:', this.extractedText);
      this.navigateToTextExtraction(this.extractedText);
    } catch (error) {
      console.error('Error during text extraction:', error);
      alert('Failed to extract text. Please try again.');
    } finally {
      // Clear Base64 strings to free memory
      this.renderedPdfImages = [];
      this.isLoading = false; // Hide loading spinner
    }
  }

navigateToTextExtraction(extractedText: string[]): void {
  // Navigate to Text Extraction Component with extracted text
  this.router.navigate(['text-extraction'], {
    state: { extractedText }
  });
}

 // Send image to the backend API for text extraction
async sendImageToApi(imageBase64: string): Promise<string> {
  const apiUrl = 'http://localhost:8000/extract-text/';

  // Send the image as FormData (could also be base64 or other formats depending on your API)
  const formData = new FormData();
  formData.append('file', this.dataURItoBlob(imageBase64), 'image.png');

  try {
    const respone = await this.http.post<{ text: string } | undefined>(apiUrl, formData).toPromise()
    return respone?.text ??'No text extracted';
  } catch (error) {
    console.error('Error sending image to API:', error);
    alert('Failed to extract text. Please try again.');
    return 'Error during OCR';
  }
}

// Helper function to convert base64 to Blob
//When sending the image to the backend API, it is converted to a Blob object.
//Blob is used because APIs often accept files (binary data), not Base64 strings.
dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]); //// Decode Base64
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([intArray], { type: mimeString });
}

  retake(): void {
    this.router.navigate(['/text-scanner']);
  }
}
