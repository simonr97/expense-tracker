import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBadgeCellRenderer } from './status-badge-cell-renderer';

describe('StatusBadgeCellRenderer', () => {
  let component: StatusBadgeCellRenderer;
  let fixture: ComponentFixture<StatusBadgeCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeCellRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeCellRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
