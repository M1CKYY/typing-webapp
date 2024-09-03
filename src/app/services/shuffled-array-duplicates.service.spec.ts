import { TestBed } from '@angular/core/testing';

import { ShuffledArrayDuplicatesService } from './shuffled-array-duplicates.service';

describe('ShuffledArrayDuplicatesService', () => {
  let service: ShuffledArrayDuplicatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuffledArrayDuplicatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
