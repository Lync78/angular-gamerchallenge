import { TestBed } from '@angular/core/testing';
import { ParticipationRequest } from './participation-request';

describe('ParticipationRequest', () => {
  let service: ParticipationRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
