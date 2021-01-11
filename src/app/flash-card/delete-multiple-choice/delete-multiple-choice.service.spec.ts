import { TestBed } from '@angular/core/testing';

import { DeleteMultipleChoiceService } from './delete-multiple-choice.service';

describe('DeleteMultipleChoiceServiceService', () => {
  let service: DeleteMultipleChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMultipleChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
