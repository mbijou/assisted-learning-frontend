import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleChoiceComponent } from './edit-single-choice.component';

describe('EditSingleChoiceComponent', () => {
  let component: EditSingleChoiceComponent;
  let fixture: ComponentFixture<EditSingleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
