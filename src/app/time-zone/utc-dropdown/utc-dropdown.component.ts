import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { map, merge } from "lodash-es";

import { UtcInfo, TimeInfo } from "../index";

@Component({
  selector: "utc-dropdown",
  templateUrl: "./utc-dropdown.component.html",
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDropdownComponent implements OnInit {
  @Input() labelName: string;
  @Input() timeZones: UtcInfo[];
  @Input() timeZone: UtcInfo;

  @Output() selectedTimeZone = new EventEmitter<UtcInfo>();

  constructor() {}

  ngOnInit() {}

  timeZoneChanged($event) {
    console.log("timeZoneChanged", this.timeZone, $event);
    this.selectedTimeZone.emit($event);
  }
}
