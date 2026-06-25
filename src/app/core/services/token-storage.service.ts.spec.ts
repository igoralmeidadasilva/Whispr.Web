import { TestBed } from '@angular/core/testing';

import { TokenStorageServiceTs } from './token-storage.service.ts';

describe('TokenStorageServiceTs', () => {
  let service: TokenStorageServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
