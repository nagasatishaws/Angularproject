import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDashComponent } from './analytics-dash.component';

describe('AnalyticsDashComponent', () => {
  let component: AnalyticsDashComponent;
  let fixture: ComponentFixture<AnalyticsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
