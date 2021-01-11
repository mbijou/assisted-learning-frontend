import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMultipleChoiceComponent } from './delete-multiple-choice.component';

describe('DeleteMultipleChoiceComponent', () => {
  let component: DeleteMultipleChoiceComponent;
  let fixture: ComponentFixture<DeleteMultipleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMultipleChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
