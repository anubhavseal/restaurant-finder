export class GetCities {
  static readonly type = "[City Search] getCities";
  constructor(public searckKey: string) {}
}

export class SetSelectedCity {
  static readonly type = "[City Search] setSelectedCity";
  constructor(public city) {}
}

export class GetSelectedCity {
  static readonly type = "[Restaurant List] getSelectedCity";
}
