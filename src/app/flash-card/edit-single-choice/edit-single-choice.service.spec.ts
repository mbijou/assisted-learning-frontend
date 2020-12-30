import { TestBed } from '@angular/core/testing';

import { EditSingleChoiceService } from './edit-single-choice.service';

describe('EditSingleChoiceService', () => {
  let service: EditSingleChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSingleChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
