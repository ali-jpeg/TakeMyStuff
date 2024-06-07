import { TestBed } from '@angular/core/testing';

import { FormToPostService } from './form-to-post.service';

describe('FormToPostService', () => {
  let service: FormToPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormToPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
