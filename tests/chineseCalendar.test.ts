import { describe, expect, it, vi } from "vitest";

import {
  ChineseCalendarError,
  getChineseCalendarInfo
} from "../src/lib/chineseCalendar/getChineseCalendarInfo";

describe("getChineseCalendarInfo", () => {
  it("returns expected data for 2024-12-21", () => {
    const result = getChineseCalendarInfo("2024-12-21", "America/Sao_Paulo");

    expect(result.gregorian).toEqual({
      date: "2024-12-21",
      weekday: "Saturday"
    });
    expect(result.lunar).toEqual({
      year: 4722,
      month: 11,
      day: 21,
      isLeapMonth: false
    });
    expect(result.zodiac).toEqual({
      animalEn: "Dragon",
      animalZh: "龍"
    });
    expect(result.ganzhi).toEqual({
      year: "甲辰",
      month: null,
      day: null
    });
    expect(result.solarTerm).toEqual({
      nameEn: "Winter Solstice",
      nameZh: "冬至"
    });
  });

  it("returns expected data for 2023-02-05", () => {
    const result = getChineseCalendarInfo("2023-02-05", "America/Sao_Paulo");

    expect(result.gregorian).toEqual({
      date: "2023-02-05",
      weekday: "Sunday"
    });
    expect(result.lunar).toEqual({
      year: 4721,
      month: 1,
      day: 15,
      isLeapMonth: false
    });
    expect(result.zodiac).toEqual({
      animalEn: "Rabbit",
      animalZh: "兔"
    });
    expect(result.ganzhi).toEqual({
      year: "癸卯",
      month: null,
      day: null
    });
    expect(result.solarTerm).toBeNull();
  });

  it("throws on invalid date format", () => {
    expect(() => getChineseCalendarInfo("2024-2-5", "UTC")).toThrowError(
      ChineseCalendarError
    );
  });

  it("throws on out-of-range dates", () => {
    expect(() => getChineseCalendarInfo("1800-01-01", "UTC")).toThrowError(
      ChineseCalendarError
    );
  });

  it("loads the database only once per process", async () => {
    vi.resetModules();
    vi.doMock("node:fs", async () => {
      const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
      return {
        ...actual,
        readFileSync: vi.fn(actual.readFileSync)
      };
    });

    const module = await import(
      "../src/lib/chineseCalendar/getChineseCalendarInfo"
    );

    module.getChineseCalendarInfo("2024-12-21", "UTC");
    module.getChineseCalendarInfo("2024-12-22", "UTC");

    const fs = await import("node:fs");
    const readFileSyncMock = vi.mocked(fs.readFileSync);
    expect(readFileSyncMock).toHaveBeenCalledTimes(1);
  });
});
