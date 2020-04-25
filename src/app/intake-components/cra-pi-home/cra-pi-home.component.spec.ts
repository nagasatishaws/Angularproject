import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraPiHomeComponent } from './cra-pi-home.component';

describe('CraPiHomeComponent', () => {
  let component: CraPiHomeComponent;
  let fixture: ComponentFixture<CraPiHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraPiHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraPiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
