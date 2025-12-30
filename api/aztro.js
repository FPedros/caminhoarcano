function getParam(value) {
  return Array.isArray(value) ? value[0] : value;
}

function readBodyParams(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    const params = new URLSearchParams(body);
    return {
      sign: params.get("sign") || undefined,
      day: params.get("day") || undefined
    };
  }

  if (body instanceof URLSearchParams) {
    return {
      sign: body.get("sign") || undefined,
      day: body.get("day") || undefined
    };
  }

  if (typeof body === "object") {
    return {
      sign: getParam(body.sign),
      day: getParam(body.day)
    };
  }

  return {};
}

export default async function handler(req, res) {
  const query = req.query || {};
  const bodyParams = readBodyParams(req.body);
  const sign = getParam(query.sign) || bodyParams.sign;
  const day = getParam(query.day) || bodyParams.day || "today";

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
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (compatible; CaminhoArcano/1.0)"
      },
      body: params
    });

    const body = await response.text();
    res.statusCode = response.status;
    res.setHeader("Cache-Control", "no-store");
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
