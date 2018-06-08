import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { createCustomElement } from "@angular/elements";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  InputTimeFormComponent,
  TimeZoneModule,
  InputThemeComponent
} from "./time-zone/";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TimeZoneModule
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    console.log("AppModule ngDoBootstrap");
    const timeConverterElement = createCustomElement(InputTimeFormComponent, {
      injector: this.injector
    });
    const timeThemeElement = createCustomElement(InputThemeComponent, {
      injector: this.injector
    });
    customElements.define("time-converter", timeConverterElement);
    customElements.define("time-theme", timeThemeElement);
  }
}
