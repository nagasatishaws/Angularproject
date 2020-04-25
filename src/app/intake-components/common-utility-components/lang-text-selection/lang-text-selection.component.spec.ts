import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangTextSelectionComponent } from './lang-text-selection.component';

describe('LangTextSelectionComponent', () => {
  let component: LangTextSelectionComponent;
  let fixture: ComponentFixture<LangTextSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangTextSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangTextSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
