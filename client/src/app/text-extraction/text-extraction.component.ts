import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-extraction',
  templateUrl: './text-extraction.component.html',
  styleUrls: ['./text-extraction.component.scss']
})
export class TextExtractionComponent implements OnInit {
  

  public extractedText: string = ''; // Single string for editable text

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    // Get the extracted text passed from the previous component
    const navigation = window.history.state;
    this.extractedText = navigation?.['extractedText'] || [];
    console.log('Extracted text received:', this.extractedText);
  }

  retake() {
    const confirmRetake = confirm('Are you sure you want to retake? This will discard the extracted text.');
    if (confirmRetake) {
      this.router.navigate(['/text-scanner']);
    }
  }

  copyText() {
    if (this.extractedText) {
      navigator.clipboard.writeText(this.extractedText).then(() => {
        alert('Text copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text. Please try again.');
      });
    }
  }

}
