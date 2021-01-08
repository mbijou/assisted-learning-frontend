import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSingleChoiceAnswerFormComponent } from './new-single-choice-answer-form.component';

describe('NewSingleChoiceAnswerFormComponent', () => {
  let component: NewSingleChoiceAnswerFormComponent;
  let fixture: ComponentFixture<NewSingleChoiceAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSingleChoiceAnswerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSingleChoiceAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
