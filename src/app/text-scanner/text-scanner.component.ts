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

  handleImage(webcamImage: WebcamImage) {
    this.capturedImage = webcamImage; // Store the captured image
    console.log('Captured image:', this.capturedImage); // Log the captured image
  }

  selectFromGallery(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file from gallery:', file);
      // Handle the selected file (e.g., preview, upload, etc.)
    }
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      // Handle the file (e.g., preview, upload, etc.)
    }
  }
}
