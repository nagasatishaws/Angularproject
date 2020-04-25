import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemailComponent } from './viewemail.component';

describe('ViewemailComponent', () => {
  let component: ViewemailComponent;
  let fixture: ComponentFixture<ViewemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
