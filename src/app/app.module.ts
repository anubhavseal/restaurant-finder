import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./core/interceptors";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RestaurantListState } from "./restaurant/restaurant-list/restaurant-list.state";
import { CityState } from "./restaurant/city-search/city-search.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot([RestaurantListState, CityState]),
    RestaurantModule,
    RouterModule.forRoot([
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/search"
      }
    ])
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
