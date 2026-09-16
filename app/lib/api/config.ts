/**
 * Configuration unique de l'accès à l'API Halterodata.
 *
 * Tout appel réseau du projet passe par `apiRequest` : aucun `fetch()` natif
 * ni `$fetch` direct n'est autorisé ailleurs (CLAUDE.md §2).
 */
import {FetchError} from "ofetch";

export type ApiQuery = Record<
  string,
  string | number | boolean | undefined | null
>;

export interface ApiRequestOptions {
  /** Paramètres de query string. L'encodage est pris en charge par ofetch. */
  query?: ApiQuery;
  signal?: AbortSignal;
}

/**
 * En-têtes d'authentification.
 *
 * L'API est publique à ce jour ; `runtimeConfig.apiToken` (privé, côté serveur)
 * constitue le point d'injection prévu si elle devient authentifiée.
 */
export function buildAuthHeaders(token?: string): Record<string, string> {
  return token ? {Authorization: `Bearer ${token}`} : {};
}

function createApiClient() {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBaseUrl;

  if (typeof baseURL !== "string" || baseURL === "") {
    throw createError({
      statusCode: 500,
      statusMessage:
        "apiBaseUrl n'est pas configuré (voir NUXT_PUBLIC_API_BASE_URL).",
    });
  }

  return $fetch.create({
    baseURL,
    headers: buildAuthHeaders(runtimeConfig.apiToken as string | undefined),
    retry: 1,
    retryStatusCodes: [408, 429, 500, 502, 503, 504],
    timeout: 10_000,
  });
}

/**
 * Exécute un appel API et valide la réponse.
 *
 * @param parse Parseur de `lib/utils/apiParsers` — c'est lui qui garantit le
 *   contrat, un cast `as` n'offrant aucune vérification.
 * @throws Une erreur Nuxt portant le code HTTP d'origine (404 inclus), afin
 *   que les pages puissent réagir plutôt que d'avaler l'échec.
 */
export async function apiRequest<T>(
  path: string,
  parse: (value: unknown) => T,
  options: ApiRequestOptions = {},
): Promise<T> {
  const client = createApiClient();

  let payload: unknown;
  try {
    payload = await client<unknown>(path, {
      query: options.query,
      signal: options.signal,
    });
  } catch (error: unknown) {
    throw toNuxtError(error, path);
  }

  return parse(payload);
}

function toNuxtError(error: unknown, path: string) {
  if (error instanceof FetchError) {
    const statusCode = error.response?.status ?? 502;
    return createError({
      statusCode,
      statusMessage:
        statusCode === 404
          ? "Ressource introuvable."
          : `L'API a répondu ${statusCode} sur ${path}.`,
      fatal: false,
      cause: error,
    });
  }

  return createError({
    statusCode: 502,
    statusMessage: `Appel API impossible sur ${path}.`,
    fatal: false,
    cause: error,
  });
}
