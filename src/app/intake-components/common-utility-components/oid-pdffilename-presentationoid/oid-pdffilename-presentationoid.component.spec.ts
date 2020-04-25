import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidPdffilenamePresentationoidComponent } from './oid-pdffilename-presentationoid.component';

describe('OidPdffilenamePresentationoidComponent', () => {
  let component: OidPdffilenamePresentationoidComponent;
  let fixture: ComponentFixture<OidPdffilenamePresentationoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OidPdffilenamePresentationoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidPdffilenamePresentationoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
