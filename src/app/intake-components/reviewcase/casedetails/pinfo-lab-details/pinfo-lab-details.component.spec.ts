import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinfoLabDetailsComponent } from './pinfo-lab-details.component';

describe('PinfoLabDetailsComponent', () => {
  let component: PinfoLabDetailsComponent;
  let fixture: ComponentFixture<PinfoLabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinfoLabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinfoLabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
