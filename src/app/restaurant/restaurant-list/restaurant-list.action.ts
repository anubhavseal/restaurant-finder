export class GetRestaurantsForSelectedCity {
  static readonly type = "[Restaurant List] GetRestaurantList";
  constructor(public cityID: number) {}
}

export class SetSelectedRestaurant {
  static readonly type = "[Restaurant List] setSelectedRestaurant";
  constructor(public selectedRestaurant) {}
}

export class ClearAllRestaurantsAndSelecetdRestaurant {
  static readonly type =
    "[Restaurant List] clearAllRestaurantsAndSelecetdRestaurant";
}

export class GetSelectedRestaurantDetails {
  static readonly type = "[Restaurant Detail] getSelectedRestaurantDetails";
  constructor(public restaurant) {}
}

export class LikeRestaurant {
  static readonly type = "[Restaurant Detail] likeRestaurant";
  constructor(public restaurant) {}
}

export class UnlikeRestaurant {
  static readonly type = "[Restaurant Detail] unlikeRestaurant";
  constructor(public restaurant) {}
}

export class GetRestaurantReviews {
  static readonly type = "[Restaurant Detail] getRestaurantReviews";
  constructor(public restaurant) {}
}

export class ClearSelectedRestaurantDetails {
  static readonly type = "[Restaurant Detail] clearSelectedRestaurantDetails";
}
