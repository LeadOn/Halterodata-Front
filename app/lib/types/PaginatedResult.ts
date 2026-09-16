/**
 * Enveloppe de pagination renvoyée par l'API.
 *
 * Attention : le contrat OpenAPI publié déclare à tort un objet unique pour
 * `GET /competition`. Cette interface reflète la
 * réponse réellement observée.
 */
export interface PaginatedResult<T> {
  page: number;
  resultsPerPage: number;
  total: number;
  results: T[];
}
