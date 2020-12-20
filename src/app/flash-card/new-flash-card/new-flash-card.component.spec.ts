import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlashCardComponent } from './new-flash-card.component';

describe('NewFlashCardComponent', () => {
  let component: NewFlashCardComponent;
  let fixture: ComponentFixture<NewFlashCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFlashCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
