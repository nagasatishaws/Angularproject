import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsurReportsComponent } from './psur-reports.component';

describe('PsurReportsComponent', () => {
  let component: PsurReportsComponent;
  let fixture: ComponentFixture<PsurReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsurReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsurReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
