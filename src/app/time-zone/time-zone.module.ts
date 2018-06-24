import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputTimeFormComponent } from "./input-time-form/input-time-form.component";
import { UtcDropdownComponent } from "./utc-dropdown/utc-dropdown.component";
import { InputThemeComponent } from "./input-theme/input-theme.component";
import { UtcValidator } from "./validators/utc.validator";

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, NgbModule],
  declarations: [
    InputTimeFormComponent,
    UtcDropdownComponent,
    InputThemeComponent,
    UtcValidator
  ],
  entryComponents: [InputTimeFormComponent, InputThemeComponent],
  exports: [InputTimeFormComponent, InputThemeComponent]
})
export class TimeZoneModule {}
