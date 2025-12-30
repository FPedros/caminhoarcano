import {
  ChineseCalendarError,
  getChineseCalendarInfo
} from "../../../lib/chineseCalendar/getChineseCalendarInfo";

const DEFAULT_TIME_ZONE = "America/Sao_Paulo";

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  const input = dateParam ?? new Date();

  try {
    const payload = getChineseCalendarInfo(input, DEFAULT_TIME_ZONE);
    return jsonResponse(payload, 200);
  } catch (error) {
    if (error instanceof ChineseCalendarError) {
      return jsonResponse({ error: error.message }, error.status);
    }

    return jsonResponse({ error: "Unexpected error." }, 500);
  }
}
