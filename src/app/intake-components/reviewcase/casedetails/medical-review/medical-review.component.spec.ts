import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReviewComponent } from './medical-review.component';

describe('MedicalReviewComponent', () => {
  let component: MedicalReviewComponent;
  let fixture: ComponentFixture<MedicalReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
