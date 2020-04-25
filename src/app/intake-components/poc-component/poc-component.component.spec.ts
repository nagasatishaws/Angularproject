import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocComponentComponent } from './poc-component.component';

describe('PocComponentComponent', () => {
  let component: PocComponentComponent;
  let fixture: ComponentFixture<PocComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
