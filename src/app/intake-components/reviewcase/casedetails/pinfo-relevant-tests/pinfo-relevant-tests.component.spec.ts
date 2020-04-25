import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinfoRelevantTestsComponent } from './pinfo-relevant-tests.component';

describe('PinfoRelevantTestsComponent', () => {
  let component: PinfoRelevantTestsComponent;
  let fixture: ComponentFixture<PinfoRelevantTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinfoRelevantTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinfoRelevantTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
