import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseProcessingComponent } from './case-processing.component';

describe('CaseProcessingComponent', () => {
  let component: CaseProcessingComponent;
  let fixture: ComponentFixture<CaseProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
