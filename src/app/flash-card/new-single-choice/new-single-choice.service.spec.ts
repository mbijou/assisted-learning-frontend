import { TestBed } from '@angular/core/testing';

import { NewSingleChoiceService } from './new-single-choice.service';

describe('NewSingleChoiceService', () => {
  let service: NewSingleChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSingleChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
