/**
 * Primitives de validation des données entrantes.
 *
 * Validation écrite à la main, sans dépendance externe. Toute donnée
 * franchissant la frontière API passe par ici : un cast `as` ne vérifie rien.
 */

/** Levée quand la réponse de l'API ne respecte pas le contrat attendu. */
export class ApiContractError extends Error {
  constructor(
    readonly path: string,
    readonly detail: string,
  ) {
    super(`Contrat API non respecté à "${path}" : ${detail}`);
    this.name = "ApiContractError";
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function requireRecord(
  value: unknown,
  path: string,
): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new ApiContractError(path, `objet attendu, reçu ${describe(value)}`);
  }
  return value;
}

export function requireArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new ApiContractError(
      path,
      `tableau attendu, reçu ${describe(value)}`,
    );
  }
  return value;
}

export function requireNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ApiContractError(
      path,
      `nombre fini attendu, reçu ${describe(value)}`,
    );
  }
  return value;
}

export function requireBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    throw new ApiContractError(
      path,
      `booléen attendu, reçu ${describe(value)}`,
    );
  }
  return value;
}

/** Nombre fini, ou `null` si absent/nul. Lève si présent mais du mauvais type. */
export function optionalNumber(value: unknown, path: string): number | null {
  if (value === null || value === undefined) return null;
  return requireNumber(value, path);
}

/** Chaîne non vide, ou `null` si absente/nulle/vide. */
export function optionalString(value: unknown, path: string): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") {
    throw new ApiContractError(
      path,
      `chaîne attendue, reçu ${describe(value)}`,
    );
  }
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Date ISO renvoyée par l'API, ou `null`.
 *
 * Neutralise la date sentinelle `0001-01-01` de .NET, qui signifie
 * « inconnue » et se rendrait sinon comme l'année 1.
 */
export function optionalApiDate(value: unknown, path: string): string | null {
  const raw = optionalString(value, path);
  if (raw === null) return null;

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getUTCFullYear() <= 1) return null;

  return raw;
}

function describe(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "un tableau";
  return typeof value;
}
