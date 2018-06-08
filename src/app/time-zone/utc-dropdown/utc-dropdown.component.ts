import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { map as lodashMap, merge, uniqBy, get } from "lodash-es";
import { UtcInfo, TimeInfo } from "../shared/index";

@Component({
  selector: "utc-dropdown",
  templateUrl: "./utc-dropdown.component.html",
  styleUrls: ["./utc-dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UtcDropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDropdownComponent implements ControlValueAccessor {
  @Input() labelName: string;
  @Input() theme: string;
  @Output() timeZoneChange = new EventEmitter<UtcInfo>();

  offsets: number[];
  allTimezones: UtcInfo[];
  _timeZone: UtcInfo;
  onChange = (_: any) => {};

  @Input()
  get timeZone(): UtcInfo {
    return this._timeZone;
  }

  set timeZone(value: UtcInfo) {
    this._timeZone = value;
    this.timeZoneChange.emit(value);
    this.onChange(this._timeZone);
  }

  @Input()
  get timeZones(): UtcInfo[] {
    return this.allTimezones;
  }

  set timeZones(values: UtcInfo[]) {
    this.allTimezones = values;
    if (values) {
      this.offsets = lodashMap(
        uniqBy(values, tz => tz.offset),
        tz => tz.offset
      );
    }
  }

  setStyles(offset) {
    const sameOffset = this._timeZone && this._timeZone.offset === offset;
    const styles = {
      color: sameOffset ? "white" : "black"
    };
    if (sameOffset) {
      styles["background-color"] = this.theme;
    }
    return styles;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term && this.filterTimeZones(term))
    );

  filterTimeZones(term) {
    if (term.length < 2 || !this.allTimezones) {
      return [];
    }
    const x = this.allTimezones
      .filter(tz => tz.utc.toLowerCase().indexOf(term.toLowerCase()) > -1)
      .slice(0, 20);
    return x;
  }

  utcFormatter = (tz: UtcInfo) => `${tz.description} ${tz.utc}`;

  writeValue(value: UtcInfo) {
    if (value) {
      this.timeZone = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
