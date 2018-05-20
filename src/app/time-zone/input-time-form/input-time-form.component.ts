import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimezoneInfo, UtcInfo } from "../index";
import { cloneDeep, flatten, sortBy } from "lodash-es";
import * as moment from "moment";
import * as momentTimezone from "moment-timezone";

@Component({
  selector: "custom-time-form",
  templateUrl: "./input-time-form.component.html",
  styleUrls: ["./input-time-form.component.scss"],
  encapsulation: ViewEncapsulation.Native
})
export class InputTimeFormComponent implements OnInit {
  time = { hour: 0, minute: 0 };
  fromTimeZones: UtcInfo[];
  toTimeZones: UtcInfo[];
  fromTimeZone: UtcInfo;
  toTimeZone: UtcInfo;
  strTotime: string = "";

  constructor(private http: HttpClient) {
    const now = moment();
    this.time = {
      hour: now.hour(),
      minute: now.minute()
    };
    this.fromTimeZone = null;
    this.toTimeZone = null;
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

        this.fromTimeZones = cloneDeep(sortedUTCs);
        this.toTimeZones = cloneDeep(sortedUTCs);

        const timeZoneName = momentTimezone.tz.guess();
        const currentTimeZone = this.fromTimeZones.find(
          tz => tz.utc === timeZoneName
        );
        if (currentTimeZone) {
          this.fromTimeZone = currentTimeZone;
        } else {
          this.fromTimeZone = this.fromTimeZones[0];
        }
        this.toTimeZone = this.toTimeZones[0];
      });
  }

  onSubmit($event) {
    $event.preventDefault();

    // let now = moment();
    // now
    //   .hour(this.time.hour)
    //   .minute(this.time.minute)
    //   .second(0);
    // console.log(now.format("YYYY-MM-DD HH:mm"));
    // console.log(this.fromTimeZone.utc, this.toTimeZone.utc);

    const tzFromTime = momentTimezone.tz(
      moment()
        .hour(this.time.hour)
        .minute(this.time.minute)
        .second(0)
        .format("YYYY-MM-DD HH:mm"),
      this.fromTimeZone.utc
    );
    const tzToTime = tzFromTime.clone().tz(this.toTimeZone.utc);
    console.log("strFromTime", tzFromTime.format());
    this.strTotime = `${tzToTime.format("YYYY-MM-DD HH:mm")} (${
      this.toTimeZone.utc
    })`;
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
