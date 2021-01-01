import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeaderInterceptorComponent } from './add-header-interceptor.component';

describe('AddHeaderInterceptorComponent', () => {
  let component: AddHeaderInterceptorComponent;
  let fixture: ComponentFixture<AddHeaderInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeaderInterceptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeaderInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
