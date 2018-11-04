import { Component, OnInit, HostListener, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";

@Component({
  selector: "app-restaurant-reviews",
  templateUrl: "./restaurant-reviews.component.html",
  styleUrls: ["./restaurant-reviews.component.css"]
})
export class RestaurantReviewsComponent implements OnInit {
  @Input()
  paginate: boolean;
  reviews;

  @Select(store => store.restaurant.selectedRestaurantReviews)
  reviews$: Observable<any>;
  constructor() {}

  @HostListener("window:scroll", ["$event"])
  fetchNextSetOfComments() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight - 2 &&
      !this.paginate
    ) {
      this.reviews = [...this.reviews, ...this.reviews];
    }
  }

  ngOnInit() {
    this.reviews$.subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
