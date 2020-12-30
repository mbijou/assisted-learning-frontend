import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleChoiceFormComponent } from './edit-single-choice-form.component';

describe('EditSingleChoiceFormComponent', () => {
  let component: EditSingleChoiceFormComponent;
  let fixture: ComponentFixture<EditSingleChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleChoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
