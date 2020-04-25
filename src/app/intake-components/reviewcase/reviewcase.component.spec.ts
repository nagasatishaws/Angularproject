import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewcaseComponent } from './reviewcase.component';

describe('ReviewcaseComponent', () => {
  let component: ReviewcaseComponent;
  let fixture: ComponentFixture<ReviewcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
