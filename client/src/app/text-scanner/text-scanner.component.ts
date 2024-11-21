import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';


@Component({
  selector: 'app-text-scanner',
  templateUrl: './text-scanner.component.html',
  styleUrls: ['./text-scanner.component.scss']
})
export class TextScannerComponent {
  @ViewChild('webcam') webcam: any; // Reference to the webcam component
  public trigger: Subject<void> = new Subject<void>();   // Subject for triggering the photo capture
  public capturedImage: WebcamImage | null = null; // Declare the image variable to hold the captured image
  public selectedPdfFile: File | null = null;
  public fileName: string = '';
  public isLoading: boolean = false;

  constructor(private router: Router) {
  }

  onMenuClick() {
    console.log('Menu icon clicked');
    // Logic for opening the menu or sidebar can go here
  }

  onProfileClick() {
    console.log('Profile icon clicked');
    this.router.navigate(['/profile']);
  }

  captureImage(event: Event) {
    this.trigger.next(); // Emit a value to trigger the image capture
  }

  handleImage(webcamImage: WebcamImage): void {
    console.log('Captured image:', webcamImage); // Log the captured image
  
    // Use `_imageAsDataUrl` to navigate
    const base64Image = webcamImage.imageAsDataUrl; // This contains the Data URL
    this.router.navigate(['/image-adjustment'], {
      state: { image: base64Image} // Pass Base64 image to the next component   
    });
  }

  selectGallery(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate image file type
      if (!file.type.startsWith('image/')) {
        console.log('Please select a valid image file');
        return;
      }

      console.log('Selected from gallery:', file);
    
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result; // Get the Base64 string
        this.router.navigate(['/image-adjustment'], {
          state: { image: imageBase64 }
        });
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPdfFile = input.files[0];
      
      // Check if the selected file is a PDF
      if (this.selectedPdfFile.type === 'application/pdf') {
        console.log('PDF file selected:', this.selectedPdfFile);
        
        this.isLoading = true;
        
        const pdfReader = new FileReader();

        pdfReader.onload = (e: any) => {
          const pdfBase64 = pdfReader.result as string; // Convert the PDF file to Base64
          this.router.navigate(['/image-adjustment'], {
            state: { pdfFile: pdfBase64 } // Pass the Base64 encoded PDF
          });
        }
        
        // Read the selected file as Base64
        pdfReader.readAsDataURL(this.selectedPdfFile); // Read the file as Base64 URL
      } else {
        console.log('Please select a valid PDF file');
      }
    }
  }
  
}
