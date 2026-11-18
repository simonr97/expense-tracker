import { TestBed } from '@angular/core/testing';

import { SelectedYearMonth } from './selected-year-month';

describe('SelectedYearMonth', () => {
  let service: SelectedYearMonth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedYearMonth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
