import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';
import { CitySearchComponent } from './city-search/city-search.component';

const routes: Routes = [
  {
    path: 'search',
    component: CitySearchComponent
  },
  {
    path: 'list',
    component: RestaurantListComponent
  },
  {
    path: 'detail',
    component: RestaurantDetailComponent
  },
  {
    path: 'reviews',
    component: RestaurantReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
