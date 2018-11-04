import { Component, OnInit, OnDestroy } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import {
  GetSelectedRestaurantDetails,
  LikeRestaurant,
  UnlikeRestaurant,
  ClearSelectedRestaurantDetails
} from "../restaurant-list/restaurant-list.action";

@Component({
  selector: "app-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html",
  styleUrls: ["./restaurant-detail.component.css"]
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {
  reviews;
  restaurant;
  storeUnsubscribe;
  restaurantUnsubscribe;
  reviewsUnsubscribe;

  @Select(state => state.restaurant.selectedRestaurant)
  selectedRestaurant$: Observable<any>;
  @Select(state => state.restaurant.selectedRestaurantDetails)
  restaurant$: Observable<any>;
  @Select(state => state.restaurant.selectedRestaurantReviews)
  reviews$: Observable<any>;

  constructor(private store: Store) {}

  likeRestaurant() {
    this.store.dispatch(new LikeRestaurant(this.restaurant));
  }

  unlikeRestaurant() {
    this.store.dispatch(new UnlikeRestaurant(this.restaurant));
  }

  ngOnInit() {
    this.selectedRestaurant$.subscribe(selectedRestaurant => {
      this.storeUnsubscribe = this.store
        .dispatch(new GetSelectedRestaurantDetails(selectedRestaurant))
        .pipe(withLatestFrom(this.restaurant$))
        .subscribe(([, restaurant]) => {
          this.restaurant = restaurant;
        });
    });
    this.restaurantUnsubscribe = this.restaurant$.subscribe(restauraunt => {
      this.restaurant = restauraunt;
    });
    this.reviewsUnsubscribe = this.reviews$.subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  ngOnDestroy() {
    this.storeUnsubscribe.unsubscribe();
    this.restaurantUnsubscribe.unsubscribe();
    this.reviewsUnsubscribe.unsubscribe();
    this.store.dispatch(new ClearSelectedRestaurantDetails());
  }
}
