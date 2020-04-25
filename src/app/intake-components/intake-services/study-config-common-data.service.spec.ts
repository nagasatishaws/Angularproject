import { TestBed } from '@angular/core/testing';

import { StudyConfigCommonDataService } from './study-config-common-data.service';

describe('StudyConfigCommonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyConfigCommonDataService = TestBed.get(StudyConfigCommonDataService);
    expect(service).toBeTruthy();
  });
});
