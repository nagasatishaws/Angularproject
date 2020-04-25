import { TestBed } from '@angular/core/testing';

import { StudyConfigApidataResolverService } from './study-config-apidata-resolver.service';

describe('StudyConfigApidataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyConfigApidataResolverService = TestBed.get(StudyConfigApidataResolverService);
    expect(service).toBeTruthy();
  });
});
