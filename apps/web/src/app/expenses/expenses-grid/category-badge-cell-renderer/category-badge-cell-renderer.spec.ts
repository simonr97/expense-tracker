import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBadgeCellRenderer } from './category-badge-cell-renderer';

describe('CategoryBadgeCellRenderer', () => {
  let component: CategoryBadgeCellRenderer;
  let fixture: ComponentFixture<CategoryBadgeCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBadgeCellRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryBadgeCellRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
