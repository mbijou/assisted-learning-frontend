import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSingleChoiceAnswerComponent } from './new-single-choice-answer.component';

describe('NewSingleChoiceAnswerComponent', () => {
  let component: NewSingleChoiceAnswerComponent;
  let fixture: ComponentFixture<NewSingleChoiceAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSingleChoiceAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSingleChoiceAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
