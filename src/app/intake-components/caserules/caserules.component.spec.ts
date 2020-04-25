import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaserulesComponent } from './caserules.component';

describe('CaserulesComponent', () => {
  let component: CaserulesComponent;
  let fixture: ComponentFixture<CaserulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaserulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaserulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
