export default async function handler(req, res) {
  const qParam = req.query?.q;
  const langParam = req.query?.langpair;
  const q = Array.isArray(qParam) ? qParam[0] : qParam;
  const langpair = Array.isArray(langParam) ? langParam[0] : langParam;

  if (!q || !langpair) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing q or langpair." }));
    return;
  }

  const params = new URLSearchParams({ q, langpair }).toString();

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?${params}`
    );
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
    res.end(JSON.stringify({ error: "Failed to reach translation API." }));
  }
}
