import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcomitantDrugComponent } from './concomitant-drug.component';

describe('ConcomitantDrugComponent', () => {
  let component: ConcomitantDrugComponent;
  let fixture: ComponentFixture<ConcomitantDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcomitantDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcomitantDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
