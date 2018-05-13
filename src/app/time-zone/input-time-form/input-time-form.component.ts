import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "custom-time-form",
  templateUrl: "./input-time-form.component.html",
  styleUrls: ["./bootstrap.css", "./input-time-form.component.scss"],
  encapsulation: ViewEncapsulation.Native
})
export class InputTimeFormComponent implements OnInit {
  time = { hour: 0, minute: 0 };
  time1 = { hour: 0, minute: 0 };
  constructor() {
    this.time = {
      hour: 13,
      minute: 30
    };

    this.time1 = {
      hour: 13,
      minute: 30
    };
  }

  // styleUrls: ["./bootstrap.css", "./input-time-form.component.scss"],

  ngOnInit() {}
}
