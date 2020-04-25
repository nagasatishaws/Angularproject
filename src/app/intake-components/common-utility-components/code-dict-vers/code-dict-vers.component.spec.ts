import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDictVersComponent } from './code-dict-vers.component';

describe('CodeDictVersComponent', () => {
  let component: CodeDictVersComponent;
  let fixture: ComponentFixture<CodeDictVersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeDictVersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDictVersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
