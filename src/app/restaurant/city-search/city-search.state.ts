import { State, Action, StateContext } from "@ngxs/store";
import { CityService } from "src/app/core/services/city.service";
import { GetCities, SetSelectedCity } from "./city-search.action";
import { tap } from "rxjs/operators";

@State({
  name: "city",
  defaults: {
    cityList: [],
    selectedCity: {}
  }
})
export class CityState {
  constructor(private cityService: CityService) {}
  @Action(GetCities)
  getCities(ctx: StateContext<any>, action: GetCities) {
    return this.cityService.getCities(action.searckKey).pipe(
      tap(cities => {
        ctx.patchState({
          cityList: [...cities["location_suggestions"]]
        });
      })
    );
  }

  @Action(SetSelectedCity)
  setSelectedCity(ctx: StateContext<any>, action: SetSelectedCity) {
    ctx.patchState({
      selectedCity: { ...action.city }
    });
  }
}
