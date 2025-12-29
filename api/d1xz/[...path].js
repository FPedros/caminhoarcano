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
  const targetUrl = `https://www.d1xz.net/${targetPath}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CaminhoArcano/1.0)",
        Accept: "text/html"
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.statusCode = response.status;
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "text/html"
    );
    res.end(buffer);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to reach d1xz." }));
  }
}
