import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatecheckComponent } from './duplicatecheck.component';

describe('DuplicatecheckComponent', () => {
  let component: DuplicatecheckComponent;
  let fixture: ComponentFixture<DuplicatecheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatecheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
