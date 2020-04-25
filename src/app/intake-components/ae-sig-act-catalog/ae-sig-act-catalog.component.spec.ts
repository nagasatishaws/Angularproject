import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeSigActCatalogComponent } from './ae-sig-act-catalog.component';

describe('AeSigActCatalogComponent', () => {
  let component: AeSigActCatalogComponent;
  let fixture: ComponentFixture<AeSigActCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeSigActCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeSigActCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
