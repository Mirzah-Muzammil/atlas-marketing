export function validateApiKey(req: Request): boolean {
  const apiKey = req.headers.get("X-Api-Key");
  const expectedKey = process.env.API_KEY || "dooyt-demo-key-2026";
  return apiKey === expectedKey;
}

export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: "Unauthorized. Invalid or missing API key." }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }
  );
}
