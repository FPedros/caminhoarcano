import { describe, expect, it } from "vitest";

import { GET } from "../src/app/api/chinese-calendar/route";

describe("GET /api/chinese-calendar", () => {
  it("returns 400 for invalid date input", async () => {
    const request = new Request(
      "http://localhost/api/chinese-calendar?date=2024-13-99"
    );

    const response = await GET(request);
    expect(response.status).toBe(400);
  });

  it("returns 200 for valid date input", async () => {
    const request = new Request(
      "http://localhost/api/chinese-calendar?date=2024-12-21"
    );

    const response = await GET(request);
    expect(response.status).toBe(200);

    const payload = (await response.json()) as {
      gregorian?: { date?: string };
    };

    expect(payload.gregorian?.date).toBe("2024-12-21");
  });
});
