import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSingleChoiceComponent } from './delete-single-choice.component';

describe('DeleteSingleChoiceComponent', () => {
  let component: DeleteSingleChoiceComponent;
  let fixture: ComponentFixture<DeleteSingleChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSingleChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
