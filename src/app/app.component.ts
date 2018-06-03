import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<time-theme [(theme)]="theme"></time-theme>
             <time-converter [theme]="theme"></time-converter>
            `,
  styleUrls: []
})
export class AppComponent {
  title = "app";
  theme = "rebeccapurple";
}
