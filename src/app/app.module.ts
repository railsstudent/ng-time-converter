import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { createCustomElement } from "@angular/elements";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { InputTimeFormComponent, TimeZoneModule } from "./time-zone/";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TimeZoneModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const timeConverterElement = createCustomElement(InputTimeFormComponent, {
      injector: this.injector
    });
    customElements.define("time-converter", timeConverterElement);
  }
}
