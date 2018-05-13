import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputTimeFormComponent } from "./input-time-form/input-time-form.component";

@NgModule({
  imports: [CommonModule, NgbModule, FormsModule],
  declarations: [InputTimeFormComponent],
  entryComponents: [InputTimeFormComponent],
  exports: [InputTimeFormComponent]
})
export class TimeZoneModule {}
