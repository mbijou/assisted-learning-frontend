import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFlashCardsComponent } from './all-flash-cards.component';

describe('AllFlashCardsComponent', () => {
  let component: AllFlashCardsComponent;
  let fixture: ComponentFixture<AllFlashCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFlashCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
