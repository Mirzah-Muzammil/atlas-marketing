import "server-only";

import { headers } from "next/headers";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown>;
};

async function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  if (host) {
    const protocol = requestHeaders.get("x-forwarded-proto") || "http";
    return `${protocol}://${host}`;
  }

  return `http://localhost:${process.env.PORT || "3000"}`;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const baseUrl = await getBaseUrl();
  const url = new URL(path, baseUrl);
  const { headers: customHeaders, body, ...rest } = options;
  const isJsonBody =
    body !== undefined &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer);

  const response = await fetch(url, {
    cache: "no-store",
    ...rest,
    headers: {
      Accept: "application/json",
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...customHeaders,
    },
    body: isJsonBody ? JSON.stringify(body) : body,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} ${url.pathname} ${message}`
    );
  }

  return response.json() as Promise<T>;
}
