import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TimezoneInfo, UtcInfo, TimeInfo, SubmittedData } from "../index";
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
  @Output() submitPerformed = new EventEmitter<SubmittedData>();

  time: TimeInfo;
  fromTimeZones: UtcInfo[];
  toTimeZones: UtcInfo[];
  fromTimeZone: UtcInfo;
  toTimeZone: UtcInfo;
  convertedTime: string = "";

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
          timezone.utc.map(utc => ({
            utc,
            offset: timezone.offset,
            description: this.generateOffsetString(timezone.offset)
          }))
        );
        const sortedUTCs = sortBy(flatten(utcMappings), ["offset", "utc"]);
        console.log(sortedUTCs);

        this.fromTimeZones = cloneDeep(sortedUTCs);
        this.toTimeZones = cloneDeep(sortedUTCs);

        const timeZoneName = momentTimezone.tz.guess();
        const currentTimeZone = this.fromTimeZones.find(
          tz => tz.utc === timeZoneName
        );
        this.fromTimeZone = currentTimeZone
          ? currentTimeZone
          : this.fromTimeZones[0];
        this.toTimeZone = this.toTimeZones[0];
      });
  }

  onSubmit($event) {
    $event.preventDefault();
    const strFromTime = moment()
      .hour(this.time.hour)
      .minute(this.time.minute)
      .second(0)
      .format("YYYY-MM-DD HH:mm");
    const tzFromTime = momentTimezone.tz(strFromTime, this.fromTimeZone.utc);
    const tzToTime = tzFromTime.clone().tz(this.toTimeZone.utc);
    this.convertedTime = `${tzToTime.format("YYYY-MM-DD HH:mm")} (${
      this.toTimeZone.utc
    })`;

    this.submitPerformed.emit({
      fromTimeZone: this.fromTimeZone,
      toTimeZone: this.toTimeZone,
      convertedTime: this.convertedTime
    });
  }

  generateOffsetString(offset: number) {
    const sign = offset >= 0 ? "+" : "-";
    const zero =
      (offset >= 0 && offset < 10) || (offset >= -9 && offset) < 0 ? "0" : "";
    const absOffset = Math.abs(offset);
    const intPart = Math.floor(absOffset);
    const minute = (absOffset - intPart) * 60;
    const minuteZero = minute < 10 ? "0" : "";
    return `(UTC ${sign}${zero}${intPart}:${minuteZero}${minute})`;
  }
}
