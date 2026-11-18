import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePreviewCard } from './income-preview-card';

describe('IncomePreviewCard', () => {
  let component: IncomePreviewCard;
  let fixture: ComponentFixture<IncomePreviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomePreviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomePreviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
