import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { TimeZoneModule } from "./time-zone/time-zone.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgbModule.forRoot(), TimeZoneModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
