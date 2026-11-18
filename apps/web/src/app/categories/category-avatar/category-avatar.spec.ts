import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAvatar } from './category-avatar';

describe('CategoryAvatar', () => {
  let component: CategoryAvatar;
  let fixture: ComponentFixture<CategoryAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
