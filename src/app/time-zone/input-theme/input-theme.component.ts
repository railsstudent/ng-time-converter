import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "time-theme",
  templateUrl: "./input-theme.component.html",
  styleUrls: ["./input-theme.component.scss"]
})
export class InputThemeComponent implements OnInit {
  themes = ["blue", "green", "rebeccapurple", "red", "firebrick", "goldenrod"];

  @Input() theme: string;
  @Output()
  public themeChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  setTheme(color) {
    console.log("setTheme", color);
    this.theme = color;
    this.themeChange.emit(color);
  }
}
