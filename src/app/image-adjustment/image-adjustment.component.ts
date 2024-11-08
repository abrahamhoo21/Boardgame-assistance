import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { createWorker } from 'tesseract.js';
import { isPlatformBrowser } from '@angular/common';


interface CustomWorker extends Worker {
  loadLanguage: (lang: string) => Promise<void>;
  initialize: (lang: string) => Promise<void>;
  recognize: (image: string) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
}

@Component({
  selector: 'app-image-adjustment',
  templateUrl: './image-adjustment.component.html',
  styleUrls: ['./image-adjustment.component.scss']
})
export class ImageAdjustmentComponent implements OnInit, OnDestroy {
  public image?: string; // Image data from the previous page
  public croppedImage: string | null = null;
  private worker: CustomWorker | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.image = navigation?.extras.state?.['image']; // Get the image from router state
  }

  ngOnInit(): void {
    if (isPlatformBrowser && isPlatformBrowser(this.platformId)) {
      this.initWorker();
    }
  }

  async initWorker() {
    if (this.platformId && isPlatformBrowser(this.platformId)) {
      this.worker = await createWorker() as unknown as CustomWorker;
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
    }
  }

  onImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 || null; // Assign null if event.base64 is undefined
  }

  async confirm(): Promise<void> {
    if (this.croppedImage && this.worker) {
      try {
        // Recognize the text in the cropped image
        const { data: { text } } = await this.worker.recognize(this.croppedImage);
        console.log('Extracted text:', text);

        // Navigate to the text extraction page and pass the extracted text
        this.router.navigate(['text-extraction'], {
          state: { extractedText: text } // Pass the extracted text to the next page
        });
      } catch (err) {
        console.error('OCR Error:', err);
      }
    } else {
      if (!this.croppedImage) {
        console.error('Cropped image is not available');
      } else {
        console.error('Tesseract worker is not initialized or cannot run on the server-side.');
      }
    }
  }

  ngOnDestroy(): void { 
    if (this.worker) { 
      this.worker.terminate(); 
    }
  }

  retake(): void {
    this.router.navigate(['/text-scanner']);
  }
}
