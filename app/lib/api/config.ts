import {$fetch} from "ofetch";

export type ApiClientOptions = {
  baseURL?: string;
  apiKey?: string;
  headers?: Record<string, string>;
};

function getApiBaseUrl(): string {
  const runtimeConfig = useRuntimeConfig();
  const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
  return typeof apiBaseUrl === "string" ? apiBaseUrl : "";
}

export function buildAuthHeaders(apiKey?: string): Record<string, string> {
  const key = apiKey;
  return key ? {Authorization: `Bearer ${key}`} : {};
}

export function createApiClient(opts: ApiClientOptions = {}) {
  const baseURL = opts.baseURL ?? getApiBaseUrl();
  const headers = {...buildAuthHeaders(opts.apiKey), ...(opts.headers ?? {})};
  return $fetch.create({baseURL, headers});
}

export async function apiFetch<T = unknown>(url: string, options?: any) {
  // If we have a token, we use it as apiKey (which is mapped on the Authorization header)
  const client = createApiClient();

  try {
    return await client<T>(url, options);
  } catch (error: any) {
    // Double check for 401s that might slip through even with a token (e.g. revoked)
    if (error?.response?.status === 401 && import.meta.client) {
      console.warn("Received 401 from API, redirecting to login.");
      return navigateTo("/login");
    }
    throw error;
  }
}
