import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Select } from "@ngxs/store";

@Injectable({
  providedIn: "root"
})
export class RestaurantListGuard implements CanActivate {
  @Select(state => state.city.selectedCity)
  city$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.city$.pipe(
      map(city => {
        if (city.id === undefined) {
          this.router.navigate(["/search"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
