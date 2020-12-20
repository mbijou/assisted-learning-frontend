import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMultipleChoiceComponent } from './new-multiple-choice.component';

describe('NewMultipleChoiceComponent', () => {
  let component: NewMultipleChoiceComponent;
  let fixture: ComponentFixture<NewMultipleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMultipleChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
