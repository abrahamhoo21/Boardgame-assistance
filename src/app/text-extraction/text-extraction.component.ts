import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-extraction',
  templateUrl: './text-extraction.component.html',
  styleUrls: ['./text-extraction.component.scss']
})
export class TextExtractionComponent implements OnInit {
  public extractedText: string = ''; // Holds the extracted text

  constructor(private router: Router) {
    // Get the extracted text passed from the previous component (ImageAdjustmentComponent)
    const navigation = this.router.getCurrentNavigation();
    this.extractedText = navigation?.extras.state?.['extractedText'] || ''; // Default to an empty string if not provided
  }

  ngOnInit(): void {}

  // Function to handle retake
  retake() {
    this.router.navigate(['/text-scanner']);
  }

  // Function to copy text to clipboard
  copyText() {
    navigator.clipboard.writeText(this.extractedText)
      .then(() => {
        console.log('Text copied to clipboard');
        alert('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }

}
