export interface TimezoneInfo {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: string[];
}

export interface UtcInfo {
  utc: string;
  offset: number;
  description: string;
}

export interface TimeInfo {
  hour: number;
  minute: number;
}

export interface SubmittedData {
  fromTimeZone: UtcInfo;
  toTimeZone: UtcInfo;
  convertedTime: string;
}
