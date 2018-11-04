import { State, Action, StateContext } from "@ngxs/store";
import {
  GetRestaurantsForSelectedCity,
  SetSelectedRestaurant,
  GetSelectedRestaurantDetails,
  LikeRestaurant,
  UnlikeRestaurant,
  GetRestaurantReviews,
  ClearSelectedRestaurantDetails,
  ClearAllRestaurantsAndSelecetdRestaurant
} from "./restaurant-list.action";
import { RestaurantService } from "src/app/core/services/restaurant.service";
import { tap } from "rxjs/operators";

@State({
  name: "restaurant",
  defaults: {
    nextStartIndex: 0,
    restaurantList: [],
    selectedRestaurant: {},
    selectedRestaurantDetails: {},
    likedRestaurants: {},
    selectedRestaurantReviews: []
  }
})
export class RestaurantListState {
  constructor(private restaurantService: RestaurantService) {}

  @Action(GetRestaurantsForSelectedCity)
  getRestaurantList(
    ctx: StateContext<any>,
    action: GetRestaurantsForSelectedCity
  ) {
    const state = ctx.getState();
    if (state.nextStartIndex <= 80) {
      return this.restaurantService
        .fetchRestaurantsForSelectedCity(action.cityID, state.nextStartIndex)
        .pipe(
          tap(restaurantList => {
            ctx.patchState({
              restaurantList: [
                ...state.restaurantList,
                ...restaurantList["restaurants"]
              ],
              nextStartIndex: state.nextStartIndex + 20
            });
          })
        );
    }
  }

  @Action(SetSelectedRestaurant)
  setSelectedRestaurant(ctx: StateContext<any>, action: SetSelectedRestaurant) {
    ctx.patchState({
      selectedRestaurant: action.selectedRestaurant
    });
  }

  @Action(GetSelectedRestaurantDetails)
  getSelectedRestaurantDetails(
    ctx: StateContext<any>,
    action: GetSelectedRestaurantDetails
  ) {
    const state = ctx.getState();
    if (action.restaurant.restaurant) {
      return this.restaurantService
        .fetchRestaurantDetails(action.restaurant)
        .pipe(
          tap(restaurantDetails => {
            this.generateCuisines(restaurantDetails);
            if (state.likedRestaurants[restaurantDetails["id"]] !== undefined) {
              restaurantDetails["liked"] = true;
            }
            ctx.patchState({
              selectedRestaurantDetails: restaurantDetails
            });
          })
        );
    }
  }

  @Action(GetRestaurantReviews)
  getRestaurantReviews(ctx: StateContext<any>, action: GetRestaurantReviews) {
    return this.restaurantService
      .fetchRestaurantReviews(action.restaurant)
      .pipe(
        tap(restaurantReviews => {
          ctx.patchState({
            selectedRestaurantReviews: restaurantReviews["user_reviews"]
          });
        })
      );
  }

  @Action(LikeRestaurant)
  likeRestaurant(ctx: StateContext<any>, action: LikeRestaurant) {
    const state = ctx.getState();
    ctx.patchState({
      likedRestaurants: {
        ...state.likedRestaurants,
        [action.restaurant.id]: { resID: action.restaurant.id }
      },
      selectedRestaurantDetails: {
        ...state.selectedRestaurantDetails,
        liked: true
      }
    });
    this.updateRestaurantsLikeInfo(ctx, action);
  }

  @Action(UnlikeRestaurant)
  unlikeRestaurant(ctx: StateContext<any>, action: UnlikeRestaurant) {
    const state = ctx.getState();
    const {
      [action.restaurant.id]: val,
      ...restLikedRestaurants
    } = state.likedRestaurants;
    ctx.patchState({
      likedRestaurants: {
        ...restLikedRestaurants
      },
      selectedRestaurantDetails: {
        ...state.selectedRestaurantDetails,
        liked: false
      }
    });
    this.updateRestaurantsLikeInfo(ctx, action);
  }

  @Action(ClearAllRestaurantsAndSelecetdRestaurant)
  clearAllRestaurantsAndSelecetdRestaurant(ctx: StateContext<any>) {
    ctx.patchState({
      nextStartIndex: 0,
      restaurantList: [],
      selectedRestaurant: {}
    });
  }

  @Action(ClearSelectedRestaurantDetails)
  clearSelectedRestaurantDetails(ctx: StateContext<any>) {
    ctx.patchState({
      selectedRestaurantDetails: {}
    });
  }

  updateRestaurantsLikeInfo(ctx: StateContext<any>, action) {
    const state = ctx.getState();
    const updatedRestaurantList = state.restaurantList.map(restaurant => {
      if (restaurant.restaurant.id === action.restaurant.id) {
        restaurant.restaurant.liked = !restaurant.restaurant.liked;
      }
      return restaurant;
    });
    ctx.patchState({
      restaurantList: updatedRestaurantList
    });
  }

  generateCuisines(restaurant) {
    const cuisines = restaurant["cuisines"].split(",").map(cuisine => {
      return cuisine.trim();
    });
    restaurant["cuisinelist"] = cuisines;
  }
}
