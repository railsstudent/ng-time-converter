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
}
