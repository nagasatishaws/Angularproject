import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDeviceDetailsComponent } from './prod-device-details.component';

describe('ProdDeviceDetailsComponent', () => {
  let component: ProdDeviceDetailsComponent;
  let fixture: ComponentFixture<ProdDeviceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdDeviceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
