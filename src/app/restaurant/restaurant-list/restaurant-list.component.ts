import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-restaurant-list",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent implements OnInit {
  tiles;
  constructor() {
    this.tiles = [
      { text: "One", cols: 3, rows: 1, color: "lightblue" },
      { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
      { text: "Three", cols: 1, rows: 1, color: "lightpink" },
      { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" },
      { text: "One", cols: 3, rows: 1, color: "lightblue" },
      { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
      { text: "Three", cols: 1, rows: 1, color: "lightpink" },
      { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" }
    ];
  }

  ngOnInit() {}
}
