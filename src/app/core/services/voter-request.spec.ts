import { TestBed } from '@angular/core/testing';
import { VoterRequest } from './voter-request';

describe('VoterRequest', () => {
  let service: VoterRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
