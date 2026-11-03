import { TestBed } from '@angular/core/testing';
import { FontAwesome } from './font-awesome';

describe('FontAwesome', () => {
  let service: FontAwesome;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontAwesome);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
