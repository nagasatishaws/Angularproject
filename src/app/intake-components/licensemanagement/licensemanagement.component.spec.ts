import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensemanagementComponent } from './licensemanagement.component';

describe('LicensemanagementComponent', () => {
  let component: LicensemanagementComponent;
  let fixture: ComponentFixture<LicensemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
