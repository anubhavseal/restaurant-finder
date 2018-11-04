import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestaurantDetailGuard implements CanActivate {
  @Select(state => state.restaurant.selectedRestaurant)
  restaurant$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.restaurant$.pipe(
      map(restaurant => {
        if (restaurant.restaurant === undefined) {
          this.router.navigate(["/list"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
