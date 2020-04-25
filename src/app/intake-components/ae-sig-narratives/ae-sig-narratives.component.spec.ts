import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeSigNarrativesComponent } from './ae-sig-narratives.component';

describe('AeSigNarrativesComponent', () => {
  let component: AeSigNarrativesComponent;
  let fixture: ComponentFixture<AeSigNarrativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeSigNarrativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeSigNarrativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
