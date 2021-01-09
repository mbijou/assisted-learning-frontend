import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMultipleChoiceAnswerFormComponent } from './new-multiple-choice-answer-form.component';

describe('NewMultipleChoiceAnswerFormComponent', () => {
  let component: NewMultipleChoiceAnswerFormComponent;
  let fixture: ComponentFixture<NewMultipleChoiceAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMultipleChoiceAnswerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMultipleChoiceAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
