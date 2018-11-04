import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { RestaurantReviewsComponent } from "./restaurant-reviews/restaurant-reviews.component";
import { CitySearchComponent } from "./city-search/city-search.component";
import { RestaurantDetailGuard } from "./restaurant-detail/restaurant-detail.guard";
import { RestaurantListGuard } from "./restaurant-list/restaurant-list.guard";

const routes: Routes = [
  {
    path: "search",
    component: CitySearchComponent
  },
  {
    path: "list",
    canActivate: [RestaurantListGuard],
    component: RestaurantListComponent
  },
  {
    path: "details",
    component: RestaurantDetailComponent,
    canActivate: [RestaurantDetailGuard]
  },
  {
    path: "reviews",
    canActivate: [RestaurantDetailGuard],
    component: RestaurantReviewsComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/search"
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/search"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {}
