import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAdjustmentComponent } from './image-adjustment.component';

describe('ImageAdjustmentComponent', () => {
  let component: ImageAdjustmentComponent;
  let fixture: ComponentFixture<ImageAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
