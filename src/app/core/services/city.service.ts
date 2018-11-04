import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(private http: HttpClient) {}

  getCities(searchKey: string) {
    return this.http.get(`/cities?q=${searchKey}`);
  }
}
