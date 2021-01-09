import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMultipleChoiceAnswerComponent } from './new-multiple-choice-answer.component';

describe('NewMultipleChoiceAnswerComponent', () => {
  let component: NewMultipleChoiceAnswerComponent;
  let fixture: ComponentFixture<NewMultipleChoiceAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMultipleChoiceAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMultipleChoiceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
