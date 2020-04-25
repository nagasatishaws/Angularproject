import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeSignalsComponent } from './ae-signals.component';

describe('AeSignalsComponent', () => {
  let component: AeSignalsComponent;
  let fixture: ComponentFixture<AeSignalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeSignalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
