import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequeueComponent } from './createqueue.component';

describe('CreatequeueComponent', () => {
  let component: CreatequeueComponent;
  let fixture: ComponentFixture<CreatequeueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequeueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequeueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
