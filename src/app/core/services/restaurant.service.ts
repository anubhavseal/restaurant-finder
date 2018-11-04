import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  fetchRestaurantsForSelectedCity(cityID, start = 0) {
    return this.http.get(
      `/search?entity_id=${cityID}&entity_type=city&start=${start}`
    );
  }

  fetchRestaurantDetails(selectedRestaurant) {
    return this.http.get(
      `/restaurant?res_id=${selectedRestaurant.restaurant.id}`
    );
  }

  fetchRestaurantReviews(selectedRestaurant) {
    return this.http.get(`/reviews?res_id=${selectedRestaurant.restaurant.id}`);
  }
}
