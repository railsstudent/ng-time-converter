import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  FormControl,
  Validator,
  ValidatorFn
} from "@angular/forms";
import { get } from "lodash-es";

function utcValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const timeZone = control.value;
    const err = {
      timezone: {
        invalid: true
      }
    };

    if (!timeZone) {
      return err;
    }
    const description = get(timeZone, "description", null);
    const offset = get(timeZone, "offset", null);
    const utc = get(timeZone, "utc", null);
    return description == null || offset == null || utc == null ? err : null;
  };
}

@Directive({
  selector: "[timezone][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UtcValidator,
      multi: true
    }
  ]
})
export class UtcValidator implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return utcValidator()(control);
  }
}
