import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeSigAletsComponent } from './ae-sig-alets.component';

describe('AeSigAletsComponent', () => {
  let component: AeSigAletsComponent;
  let fixture: ComponentFixture<AeSigAletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeSigAletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeSigAletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
