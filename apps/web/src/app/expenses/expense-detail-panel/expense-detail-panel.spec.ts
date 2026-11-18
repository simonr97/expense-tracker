import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailPanel } from './expense-detail-panel';

describe('ExpenseDetailPanel', () => {
  let component: ExpenseDetailPanel;
  let fixture: ComponentFixture<ExpenseDetailPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDetailPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseDetailPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
