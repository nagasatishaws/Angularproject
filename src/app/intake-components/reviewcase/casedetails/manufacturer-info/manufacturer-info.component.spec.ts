import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerInfoComponent } from './manufacturer-info.component';

describe('ManufacturerInfoComponent', () => {
  let component: ManufacturerInfoComponent;
  let fixture: ComponentFixture<ManufacturerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
