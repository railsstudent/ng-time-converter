import {
  Component,
  Output,
  Input,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "time-theme",
  templateUrl: "./input-theme.component.html",
  styleUrls: ["./input-theme.component.scss"],
  encapsulation: ViewEncapsulation.Native
})
export class InputThemeComponent {
  themes = ["blue", "green", "rebeccapurple", "red", "firebrick", "goldenrod"];
  _theme: string;
  
  @Output()
  public themeChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get theme() {
    return this._theme;
  }

  set theme(color) {
    this._theme = color;
    this.themeChange.emit(color);
  }
}
