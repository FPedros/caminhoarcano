export default async function handler(req, res) {
  const signParam = req.query?.sign;
  const dayParam = req.query?.day;
  const sign = Array.isArray(signParam) ? signParam[0] : signParam;
  const day = Array.isArray(dayParam) ? dayParam[0] : dayParam || "today";

  if (!sign) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing sign." }));
    return;
  }

  const params = new URLSearchParams({ sign, day }).toString();

  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const body = await response.text();
    res.statusCode = response.status;
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json"
    );
    res.end(body);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to reach Aztro." }));
  }
}
