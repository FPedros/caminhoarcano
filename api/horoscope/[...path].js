export default async function handler(req, res) {
  const query = req.query || {};
  const pathParam = query.path;
  const pathParts = Array.isArray(pathParam)
    ? pathParam
    : pathParam
      ? [pathParam]
      : [];
  const targetPath = pathParts.join("/");
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (key === "path") {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
    } else if (value !== undefined) {
      params.append(key, value);
    }
  }

  const queryString = params.toString();
  const targetUrl = `https://horoscope-app-api.vercel.app/${targetPath}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(targetUrl);
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
    res.end(JSON.stringify({ error: "Failed to reach horoscope API." }));
  }
}
