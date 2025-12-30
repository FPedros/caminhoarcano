import { createRequire } from "node:module";

import type {
  CompoundDate,
  Database as CalendarDatabase
} from "traditional-chinese-calendar-database";

import { getDb } from "./db";

const require = createRequire(import.meta.url);
const calendarPackage = require(
  "traditional-chinese-calendar-database"
) as typeof import("traditional-chinese-calendar-database");
const { Constants } = calendarPackage;

const DEFAULT_TIME_ZONE = "America/Sao_Paulo";
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const BASE_UTC_DAY = Date.UTC(1901, 0, 1);
const LUNAR_YEAR_OFFSET = 2698;

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const ZODIAC_ANIMALS = [
  { animalEn: "Rat", animalZh: "鼠" },
  { animalEn: "Ox", animalZh: "牛" },
  { animalEn: "Tiger", animalZh: "虎" },
  { animalEn: "Rabbit", animalZh: "兔" },
  { animalEn: "Dragon", animalZh: "龍" },
  { animalEn: "Snake", animalZh: "蛇" },
  { animalEn: "Horse", animalZh: "馬" },
  { animalEn: "Goat", animalZh: "羊" },
  { animalEn: "Monkey", animalZh: "猴" },
  { animalEn: "Rooster", animalZh: "雞" },
  { animalEn: "Dog", animalZh: "狗" },
  { animalEn: "Pig", animalZh: "豬" }
];

const SOLAR_TERMS_EN = [
  "Start of Spring",
  "Rain Water",
  "Insects Awaken",
  "Vernal Equinox",
  "Clear and Bright",
  "Grain Rain",
  "Start of Summer",
  "Grain Full",
  "Grain in Ear",
  "Summer Solstice",
  "Minor Heat",
  "Major Heat",
  "Start of Autumn",
  "End of Heat",
  "White Dew",
  "Autumnal Equinox",
  "Cold Dew",
  "Frost's Descent",
  "Start of Winter",
  "Minor Snow",
  "Major Snow",
  "Winter Solstice",
  "Minor Cold",
  "Major Cold"
];

export type ChineseCalendarInfo = {
  gregorian: { date: string; weekday: string };
  lunar: { year: number; month: number; day: number; isLeapMonth: boolean };
  zodiac: { animalEn: string | null; animalZh: string | null };
  ganzhi: { year: string | null; month: string | null; day: string | null };
  solarTerm: { nameEn: string; nameZh: string } | null;
};

export class ChineseCalendarError extends Error {
  readonly code: "INVALID_DATE" | "OUT_OF_RANGE" | "INVALID_TIMEZONE";
  readonly status: number;

  constructor(
    code: "INVALID_DATE" | "OUT_OF_RANGE" | "INVALID_TIMEZONE",
    message: string,
    status: number
  ) {
    super(message);
    this.name = "ChineseCalendarError";
    this.code = code;
    this.status = status;
  }
}

type NormalizedDate = {
  year: number;
  month: number;
  day: number;
  dateString: string;
};

type DatabaseWithInternals = CalendarDatabase & {
  slice: (offset: number) => CompoundDate;
  arrayBuffer: ArrayBuffer;
};

function assertValidTimeZone(timeZone: string): void {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
  } catch (error) {
    throw new ChineseCalendarError(
      "INVALID_TIMEZONE",
      `Invalid time zone: ${timeZone}`,
      400
    );
  }
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

function formatDateParts(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function parseIsoDate(input: string): NormalizedDate {
  if (!ISO_DATE_REGEX.test(input)) {
    throw new ChineseCalendarError(
      "INVALID_DATE",
      "Date must be in YYYY-MM-DD format.",
      400
    );
  }

  const [yearString, monthString, dayString] = input.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new ChineseCalendarError(
      "INVALID_DATE",
      "Date must be in YYYY-MM-DD format.",
      400
    );
  }

  const utcDate = new Date(Date.UTC(year, month - 1, day));
  if (
    utcDate.getUTCFullYear() !== year ||
    utcDate.getUTCMonth() + 1 !== month ||
    utcDate.getUTCDate() !== day
  ) {
    throw new ChineseCalendarError("INVALID_DATE", "Invalid date value.", 400);
  }

  return { year, month, day, dateString: formatDateParts(year, month, day) };
}

function getDatePartsInTimeZone(date: Date, timeZone: string): NormalizedDate {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(date);
  const lookup: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      lookup[part.type] = part.value;
    }
  }

  const year = Number(lookup.year);
  const month = Number(lookup.month);
  const day = Number(lookup.day);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new ChineseCalendarError("INVALID_DATE", "Invalid date value.", 400);
  }

  return { year, month, day, dateString: formatDateParts(year, month, day) };
}

function normalizeDateInput(
  input: string | Date,
  timeZone: string
): NormalizedDate {
  if (typeof input === "string") {
    return parseIsoDate(input);
  }

  if (!(input instanceof Date) || Number.isNaN(input.getTime())) {
    throw new ChineseCalendarError("INVALID_DATE", "Invalid date value.", 400);
  }

  return getDatePartsInTimeZone(input, timeZone);
}

function assertDateInRange(year: number): void {
  if (year < 1901 || year > 2100) {
    throw new ChineseCalendarError(
      "OUT_OF_RANGE",
      "Date must be between 1901-01-01 and 2100-12-31.",
      400
    );
  }
}

function getCompoundDate(
  db: CalendarDatabase,
  year: number,
  month: number,
  day: number
): CompoundDate {
  const dayIndex = Math.floor((Date.UTC(year, month - 1, day) - BASE_UTC_DAY) / MS_PER_DAY);
  const dbWithInternals = db as unknown as DatabaseWithInternals;
  const maxOffset = dbWithInternals.arrayBuffer.byteLength - 5;
  const offset = dayIndex * 5;

  if (offset < 0 || offset > maxOffset) {
    throw new ChineseCalendarError(
      "OUT_OF_RANGE",
      "Date must be between 1901-01-01 and 2100-12-31.",
      400
    );
  }

  return dbWithInternals.slice(offset);
}

function getWeekdayName(year: number, month: number, day: number): string {
  const dayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return WEEKDAYS[dayIndex] ?? "";
}

function getLunarYear(
  gregorianYear: number,
  gregorianMonth: number,
  lunarMonth: number
): number {
  const beforeLunarNewYear = gregorianMonth <= 2 && lunarMonth >= 11;
  return gregorianYear + LUNAR_YEAR_OFFSET - (beforeLunarNewYear ? 1 : 0);
}

function getGanzhiYear(compound: CompoundDate): string | null {
  const stem = Constants.TIAN_GAN[compound.tiangan];
  const branch = Constants.DI_ZHI[compound.dizhi];

  if (!stem || !branch) {
    return null;
  }

  return `${stem}${branch}`;
}

function getZodiac(compound: CompoundDate): { animalEn: string | null; animalZh: string | null } {
  const zodiac = ZODIAC_ANIMALS[compound.dizhi];

  if (!zodiac) {
    return { animalEn: null, animalZh: null };
  }

  return zodiac;
}

function getSolarTerm(
  compound: CompoundDate
): { nameEn: string; nameZh: string } | null {
  const index = compound.solarTerm;

  if (!index || index < 1 || index > Constants.JIE_QI.length) {
    return null;
  }

  const nameZh = Constants.JIE_QI[index - 1];
  const nameEn = SOLAR_TERMS_EN[index - 1];

  if (!nameZh || !nameEn) {
    return null;
  }

  return { nameEn, nameZh };
}

export function getChineseCalendarInfo(
  input: string | Date,
  timeZone = DEFAULT_TIME_ZONE
): ChineseCalendarInfo {
  assertValidTimeZone(timeZone);

  const normalized = normalizeDateInput(input, timeZone);
  assertDateInRange(normalized.year);

  const db = getDb();
  const compound = getCompoundDate(
    db,
    normalized.year,
    normalized.month,
    normalized.day
  );

  const lunarYear = getLunarYear(
    normalized.year,
    normalized.month,
    compound.lunarMonth
  );

  return {
    gregorian: {
      date: normalized.dateString,
      weekday: getWeekdayName(
        normalized.year,
        normalized.month,
        normalized.day
      )
    },
    lunar: {
      year: lunarYear,
      month: compound.lunarMonth,
      day: compound.lunarDate,
      isLeapMonth: compound.leap
    },
    zodiac: getZodiac(compound),
    ganzhi: {
      year: getGanzhiYear(compound),
      month: null,
      day: null
    },
    solarTerm: getSolarTerm(compound)
  };
}
