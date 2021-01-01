import { TestBed } from '@angular/core/testing';

import { EditMultipleChoiceService } from './edit-multiple-choice.service';

describe('EditMultipleChoiceService', () => {
  let service: EditMultipleChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMultipleChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
