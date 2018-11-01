import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RestaurantRoutingModule
  ],
  declarations: [RestaurantListComponent, RestaurantDetailComponent, RestaurantReviewsComponent, CitySearchComponent],
  exports: [
    RestaurantRoutingModule,
    CitySearchComponent
  ]
})
export class RestaurantModule { }
