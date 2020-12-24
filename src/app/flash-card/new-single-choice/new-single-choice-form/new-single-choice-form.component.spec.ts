import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSingleChoiceFormComponent } from './new-single-choice-form.component';

describe('FormComponent', () => {
  let component: NewSingleChoiceFormComponent;
  let fixture: ComponentFixture<NewSingleChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSingleChoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSingleChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
