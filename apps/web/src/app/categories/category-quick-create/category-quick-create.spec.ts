import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuickCreate } from './category-quick-create';

describe('CategoryQuickCreate', () => {
  let component: CategoryQuickCreate;
  let fixture: ComponentFixture<CategoryQuickCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryQuickCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryQuickCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
