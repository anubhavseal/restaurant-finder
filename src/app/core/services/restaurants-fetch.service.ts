import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsFetchService {
  restaurants = [];
  selectedCity;
  constructor(private http: HttpClient) { }

  setSelectedCity(selectedCity) {
    this.selectedCity = selectedCity;
  }

  fetchRestaurantsForSelectedCity() {
    return this.http.get(`/search?entity_id=${this.selectedCity.id}&entity_type=city`);
  }

  getRestaurantsForSelectedCity() {
    return this.restaurants;
  }
}
