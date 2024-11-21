import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfDataService {
  private pdfFileSource = new BehaviorSubject<File | null>(null);
  currentPdfFile = this.pdfFileSource.asObservable();

  updatePdfFile(file: File): void {
    this.pdfFileSource.next(file);
  }
}
