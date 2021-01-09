import { TestBed } from '@angular/core/testing';

import { NewMultipleChoiceAnswerService } from './new-multiple-choice-answer.service';

describe('NewMultipleChoiceAnswerService', () => {
  let service: NewMultipleChoiceAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMultipleChoiceAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
