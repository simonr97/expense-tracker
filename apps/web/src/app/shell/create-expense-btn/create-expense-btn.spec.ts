import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseBtn } from './create-expense-btn';

describe('CreateExpenseBtn', () => {
  let component: CreateExpenseBtn;
  let fixture: ComponentFixture<CreateExpenseBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExpenseBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExpenseBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
