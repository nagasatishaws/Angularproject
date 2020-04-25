import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMappingNameComponent } from './context-mapping-name.component';

describe('ContextMappingNameComponent', () => {
  let component: ContextMappingNameComponent;
  let fixture: ComponentFixture<ContextMappingNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextMappingNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMappingNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
