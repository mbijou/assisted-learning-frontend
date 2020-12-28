import { TestBed } from '@angular/core/testing';

import { NewMultipleChoiceService } from './new-multiple-choice.service';

describe('NewMultipleChoiceService', () => {
  let service: NewMultipleChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMultipleChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
