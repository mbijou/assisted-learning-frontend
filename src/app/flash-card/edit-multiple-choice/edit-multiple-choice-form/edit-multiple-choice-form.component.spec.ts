import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMultipleChoiceFormComponent } from './edit-multiple-choice-form.component';

describe('EditMultipleChoiceFormComponent', () => {
  let component: EditMultipleChoiceFormComponent;
  let fixture: ComponentFixture<EditMultipleChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMultipleChoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMultipleChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
