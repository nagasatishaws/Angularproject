import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeSigCasetrendsComponent } from './ae-sig-casetrends.component';

describe('AeSigCasetrendsComponent', () => {
  let component: AeSigCasetrendsComponent;
  let fixture: ComponentFixture<AeSigCasetrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeSigCasetrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeSigCasetrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
