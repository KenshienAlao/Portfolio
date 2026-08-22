import { type ApiReponse } from "@/lib/ApiResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6532";

export async function fetchPublicData<T>(
  endpoint: string,
  timeoutMs = 2000,
): Promise<T[]> {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiReponse<T[]> | T[];
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.results)) return json.results;
    return [];
  } catch {
    return [];
  }
}
