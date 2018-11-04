import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { GetCities, SetSelectedCity } from "./city-search.action";
import { Observable } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

@Component({
  selector: "app-city-search",
  templateUrl: "./city-search.component.html",
  styleUrls: ["./city-search.component.css"]
})
export class CitySearchComponent {
  myControl = new FormControl();
  cities = [];

  @Select(state => state.city.cityList)
  cities$: Observable<any>;

  constructor(private store: Store, private router: Router) {}

  search(searchKey) {
    this.store
      .dispatch(new GetCities(searchKey))
      .pipe(withLatestFrom(this.cities$))
      .subscribe(([, cities]) => {
        this.cities = cities;
      });
  }

  selectCity(selcetedCity) {
    this.store
      .dispatch(new SetSelectedCity(selcetedCity))
      .subscribe(() => this.router.navigate(["/list"]));
  }
}
