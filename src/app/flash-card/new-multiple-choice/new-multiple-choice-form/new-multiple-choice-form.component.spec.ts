import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMultipleChoiceFormComponent } from './new-multiple-choice-form.component';

describe('FormComponent', () => {
  let component: NewMultipleChoiceFormComponent;
  let fixture: ComponentFixture<NewMultipleChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMultipleChoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMultipleChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
