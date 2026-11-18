import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeQuickCreate } from './income-quick-create';

describe('IncomeQuickCreate', () => {
  let component: IncomeQuickCreate;
  let fixture: ComponentFixture<IncomeQuickCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeQuickCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeQuickCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
