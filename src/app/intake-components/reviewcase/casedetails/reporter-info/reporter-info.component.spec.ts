import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterInfoComponent } from './reporter-info.component';

describe('ReporterInfoComponent', () => {
  let component: ReporterInfoComponent;
  let fixture: ComponentFixture<ReporterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
