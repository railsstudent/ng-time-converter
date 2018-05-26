import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { map, merge, uniqBy } from "lodash-es";

import { UtcInfo, TimeInfo } from "../shared/index";

@Component({
  selector: "utc-dropdown",
  templateUrl: "./utc-dropdown.component.html",
  styleUrls: ["./utc-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDropdownComponent implements OnInit {

  @Input() labelName: string;
  @Output() timeZoneChange = new EventEmitter<UtcInfo>();

  offsets: number[];
  allTimezones: UtcInfo[];
  selectedOffset: UtcInfo;

  @Input()
  get timeZone(): UtcInfo {
    return this.selectedOffset;
  }

  set timeZone(value: UtcInfo) {
    this.selectedOffset = value;
    this.timeZoneChange.emit(value);
  }

  @Input()
  get timeZones(): UtcInfo[] {
    return this.allTimezones;
  }

  set timeZones(values: UtcInfo[]) {
    this.allTimezones = values;
    if (values) {
      this.offsets = map(uniqBy(values, tz => tz.offset), tz => tz.offset);
    }
  }

  constructor() {}

  ngOnInit() {
    console.log("UtcDropdownComponent", this.labelName);
    console.log("UtcDropdownComponent timeZones", this.timeZones);
    console.log("UtcDropdownComponent timeZone", this.timeZone);
  }

  setStyles(offset) {
    const sameOffset = this.selectedOffset && this.selectedOffset.offset === offset;
    const styles = {
      color: sameOffset ? 'white': 'black',
    }
    if (sameOffset) {
      styles['background-color'] = 'rebeccapurple';
    }
    return styles;
  }
}
