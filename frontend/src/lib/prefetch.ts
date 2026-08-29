import { type ApiReponse } from "@/lib/ApiResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

export async function fetchPublicData<T>(
  endpoint: string,
  timeoutMs = 10000,
): Promise<T[]> {
  const isDev = process.env.NODE_ENV === "development";

  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      next:
        isDev
          ? { revalidate: 0 }
          : { revalidate: 31536000, tags: [endpoint] },
      cache: isDev ? "no-store" : "default",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as ApiReponse<T[]> | T[];
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.results)) return json.results;
    return [];
  } catch (error) {
    console.error(`[fetchPublicData] Request failed for ${endpoint}:`, error);
    return [];
  }
}
