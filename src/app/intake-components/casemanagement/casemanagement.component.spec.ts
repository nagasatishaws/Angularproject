import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasemanagementComponent } from './casemanagement.component';

describe('CasemanagementComponent', () => {
  let component: CasemanagementComponent;
  let fixture: ComponentFixture<CasemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
