import { TestBed } from '@angular/core/testing';

import { Incomes } from './incomes';

describe('Incomes', () => {
  let service: Incomes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Incomes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
