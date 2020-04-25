import { TestBed } from '@angular/core/testing';

import { ClinicalService } from './clinical.service';

describe('ClinicalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicalService = TestBed.get(ClinicalService);
    expect(service).toBeTruthy();
  });
});
