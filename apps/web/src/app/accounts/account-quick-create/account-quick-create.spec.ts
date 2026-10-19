import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountQuickCreate } from './account-quick-create';

describe('AccountQuickCreate', () => {
  let component: AccountQuickCreate;
  let fixture: ComponentFixture<AccountQuickCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountQuickCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountQuickCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
