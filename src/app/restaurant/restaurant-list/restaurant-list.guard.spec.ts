import { TestBed, async, inject } from '@angular/core/testing';

import { RestaurantListGuard } from './restaurant-list.guard';

describe('RestaurantListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantListGuard]
    });
  });

  it('should ...', inject([RestaurantListGuard], (guard: RestaurantListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
