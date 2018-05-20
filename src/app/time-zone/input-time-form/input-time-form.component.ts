import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimezoneInfo, UtcInfo } from "../index";
import { cloneDeep, flatten, sortBy } from "lodash-es";

@Component({
  selector: "custom-time-form",
  templateUrl: "./input-time-form.component.html",
  styleUrls: ["./input-time-form.component.scss"],
  encapsulation: ViewEncapsulation.Native
})
export class InputTimeFormComponent implements OnInit {
  time = { hour: 0, minute: 0 };
  fromTimezones: UtcInfo[];
  toTimezones: UtcInfo[];
  fromTimezone: UtcInfo;
  toTimezone: UtcInfo;

  constructor(private http: HttpClient) {
    this.time = {
      hour: 13,
      minute: 30
    };
    this.fromTimezone = null;
    this.toTimezone = null;
  }

  ngOnInit() {
    this.http
      .get<TimezoneInfo[]>("./assets/timezones.json")
      .subscribe((timezones: TimezoneInfo[]) => {
        const utcMappings = timezones.map(timezone =>
          timezone.utc.map(utc => ({ utc, offset: timezone.offset }))
        );
        const sortedUTCs = sortBy(flatten(utcMappings), "offset");
        console.log(sortedUTCs);

        this.fromTimezones = cloneDeep(sortedUTCs);
        this.toTimezones = cloneDeep(sortedUTCs);
        this.fromTimezone = this.fromTimezones[0];
        this.toTimezone = this.toTimezones[0];
      });
  }

  onSubmit($event) {
    $event.preventDefault();
    console.log("onsubmit");
  }

  generateUtcString(utc: UtcInfo) {
    const sign = utc.offset >= 0 ? "+" : "-";
    const zero =
      (utc.offset >= 0 && utc.offset < 10) ||
      (utc.offset >= -9 && utc.offset) < 0
        ? "0"
        : "";
    const absOffset = Math.abs(utc.offset);
    const intPart = Math.floor(absOffset);
    const decimalPart = absOffset - intPart;
    const minute = decimalPart * 60;
    const minuteZero = decimalPart < 10 ? "0" : "";
    return `(UTC ${sign}${zero}${intPart}:${minuteZero}${minute})`;
  }
}
