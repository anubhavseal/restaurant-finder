import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { RestaurantsFetchService } from "../../core/services/restaurants-fetch.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-city-search",
  templateUrl: "./city-search.component.html",
  styleUrls: ["./city-search.component.css"]
})
export class CitySearchComponent implements OnInit {
  myControl = new FormControl();
  cities = [ ];
  constructor(private http: HttpClient, private restaurant: RestaurantsFetchService, private router: Router) {}

  search(searchKey) {
    this.http.get(`/cities?q=${searchKey}`).subscribe(res => {
      this.cities = res["location_suggestions"].map(city => {
        return city;
      });
    });
  }

  selectCity(selcetedCity) {
    console.log(selcetedCity);
    this.restaurant.setSelectedCity(selcetedCity);
    this.router.navigate(['/list']);
  }

  ngOnInit() {}
}
