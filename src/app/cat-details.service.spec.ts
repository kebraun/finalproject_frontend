import { TestBed } from '@angular/core/testing';

import { CatDetailsService } from './cat-details.service';

describe('CatDetailsService', () => {
  let service: CatDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
