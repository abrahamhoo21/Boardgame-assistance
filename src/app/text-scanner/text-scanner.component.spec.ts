import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextScannerComponent } from './text-scanner.component';

describe('TextScannerComponent', () => {
  let component: TextScannerComponent;
  let fixture: ComponentFixture<TextScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextScannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
