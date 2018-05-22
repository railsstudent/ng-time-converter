import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputTimeFormComponent } from "./input-time-form/input-time-form.component";
import { UtcDropdownComponent } from "./utc-dropdown/utc-dropdown.component";

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, NgbModule],
  declarations: [InputTimeFormComponent, UtcDropdownComponent],
  entryComponents: [InputTimeFormComponent],
  exports: [InputTimeFormComponent]
})
export class TimeZoneModule {}
