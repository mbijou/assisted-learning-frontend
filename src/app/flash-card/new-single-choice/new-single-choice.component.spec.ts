import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSingleChoiceComponent } from './new-single-choice.component';

describe('NewSingleChoiceComponent', () => {
  let component: NewSingleChoiceComponent;
  let fixture: ComponentFixture<NewSingleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSingleChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
