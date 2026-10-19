import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesGrid } from './expenses-grid';

describe('ExpensesGrid', () => {
  let component: ExpensesGrid;
  let fixture: ComponentFixture<ExpensesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
