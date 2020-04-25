import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcaserulesComponent } from './addcaserules.component';

describe('AddcaserulesComponent', () => {
  let component: AddcaserulesComponent;
  let fixture: ComponentFixture<AddcaserulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcaserulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcaserulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
