import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePreviewCard } from './expense-preview-card';

describe('ExpensePreviewCard', () => {
  let component: ExpensePreviewCard;
  let fixture: ComponentFixture<ExpensePreviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensePreviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensePreviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
