import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantHistoryComponent } from './relevant-history.component';

describe('RelevantHistoryComponent', () => {
  let component: RelevantHistoryComponent;
  let fixture: ComponentFixture<RelevantHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevantHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
