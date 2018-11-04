import { Component, OnInit, HostListener } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import {
  GetRestaurantsForSelectedCity,
  SetSelectedRestaurant,
  GetRestaurantReviews,
  ClearAllRestaurantsAndSelecetdRestaurant
} from "./restaurant-list.action";
import { Router } from "@angular/router";

@Component({
  selector: "app-restaurant-list",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent implements OnInit {
  restaurants = [];
  selectedCity: any;

  @Select(state => state.restaurant.restaurantList)
  restaurants$: Observable<any>;
  @Select(state => state.city.selectedCity)
  city$: Observable<any>;

  cityUnsubscribe;
  restaurantUnsubscribe;

  constructor(private store: Store, private router: Router) {}

  @HostListener("window:scroll", ["$event"])
  fetchNextSetOfRestaurants() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight - 2
    ) {
      this.fetchRestaurants();
    }
  }

  selectRestaurant(selectedRestaurant) {
    this.store
      .dispatch(new SetSelectedRestaurant(selectedRestaurant))
      .subscribe(() => {
        this.store
          .dispatch(new GetRestaurantReviews(selectedRestaurant))
          .subscribe(() => {
            this.router.navigate(["/details"]);
          });
      });
  }

  fetchRestaurants() {
    this.store.dispatch(
      new GetRestaurantsForSelectedCity(this.selectedCity.id)
    );
  }

  ngOnInit() {
    this.cityUnsubscribe = this.city$.subscribe(selectedCity => {
      this.selectedCity = selectedCity;
      this.restaurantUnsubscribe = this.restaurants$.subscribe(restaurants => {
        if (restaurants.length === 0) {
          this.fetchRestaurants();
        } else {
          this.restaurants = restaurants;
        }
      });
    });
  }

  ngOnDestroy() {
    this.cityUnsubscribe.unsubscribe();
    this.restaurantUnsubscribe.unsubscribe();
    if (this.router.url === "/search") {
      this.store
        .dispatch(new ClearAllRestaurantsAndSelecetdRestaurant())
        .subscribe(() => {
          this.router.navigate(["/search"]);
        });
    }
  }
}
