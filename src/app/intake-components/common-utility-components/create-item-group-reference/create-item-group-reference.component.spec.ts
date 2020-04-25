import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemGroupReferenceComponent } from './create-item-group-reference.component';

describe('CreateItemGroupReferenceComponent', () => {
  let component: CreateItemGroupReferenceComponent;
  let fixture: ComponentFixture<CreateItemGroupReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemGroupReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemGroupReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
