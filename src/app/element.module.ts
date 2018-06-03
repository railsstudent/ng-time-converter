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
  ],
  exports: [TimeZoneModule]
})
export class ElementModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    console.log("ElementModule ngDoBootstrap");
    const timeConverterElement = createCustomElement(InputTimeFormComponent, {
      injector: this.injector
    });
    customElements.define("time-converter", timeConverterElement);
  }
}
