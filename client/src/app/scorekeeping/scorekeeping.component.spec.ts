import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorekeepingComponent } from './scorekeeping.component';

describe('ScorekeepingComponent', () => {
  let component: ScorekeepingComponent;
  let fixture: ComponentFixture<ScorekeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScorekeepingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
