import { TestBed, inject } from '@angular/core/testing';

import { RestaurantsFetchService } from './restaurants-fetch.service';

describe('RestaurantsFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantsFetchService]
    });
  });

  it('should be created', inject([RestaurantsFetchService], (service: RestaurantsFetchService) => {
    expect(service).toBeTruthy();
  }));
});
