import { TestBed } from '@angular/core/testing';

import { CaseserviceService } from './caseservice.service';

describe('CaseserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseserviceService = TestBed.get(CaseserviceService);
    expect(service).toBeTruthy();
  });
});
