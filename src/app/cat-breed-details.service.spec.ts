import { TestBed } from '@angular/core/testing';

import { CatBreedDetailsService } from './cat-breed-details.service';

describe('CatBreedDetailsService', () => {
  let service: CatBreedDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatBreedDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
