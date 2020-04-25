import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulemanagementComponent } from './modulemanagement.component';

describe('ModulemanagementComponent', () => {
  let component: ModulemanagementComponent;
  let fixture: ComponentFixture<ModulemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
