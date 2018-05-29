import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { map as lodashMap, merge, uniqBy, get } from "lodash-es";

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
      this.offsets = lodashMap(uniqBy(values, tz => tz.offset), tz => tz.offset);
    }
  }

  constructor() {}

  ngOnInit() {}

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
    const x = this.allTimezones.filter(tz => tz.utc.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
    console.log(x);
    return x;
  }

  // utcFormatter = (tz: UtcInfo) => `${tz.description} ${tz.utc}`;
  utcFormatter(tz: UtcInfo) {
    console.log('utcformatter', tz);
    return `${tz.description} ${tz.utc}`;
  }

  isValid(): boolean {
    if (!this.selectedOffset) {
      return false;
    }
    const description = get(this.selectedOffset, 'description', null);
    const offset = get(this.selectedOffset, 'offset', null);
    const utc = get(this.selectedOffset, 'utc', null);

    return description != null && offset != null && utc !== '';
  }
}
