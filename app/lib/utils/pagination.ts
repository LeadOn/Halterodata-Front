/** Élément de la barre de pagination : un numéro de page ou une élision. */
export type PageItem = number | "ellipsis";

/** Nombre de pages affichées sans élision. */
const MAX_PAGES_WITHOUT_ELLIPSIS = 7;

/**
 * Construit la fenêtre de pagination : `1 … n-1 n n+1 … total`.
 *
 * Logique pure, consommée par `UiPagination`.
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages <= 0) return [];

  if (totalPages <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({length: totalPages}, (_, index) => index + 1);
  }

  const current = Math.min(Math.max(currentPage, 1), totalPages);

  if (current <= 3) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (current >= totalPages - 3) {
    const tail = Array.from({length: 5}, (_, index) => totalPages - 4 + index);
    return [1, "ellipsis", ...tail];
  }

  return [
    1,
    "ellipsis",
    current - 1,
    current,
    current + 1,
    "ellipsis",
    totalPages,
  ];
}

/** Index du dernier élément affiché sur la page courante. */
export function getEndIndex(
  currentPage: number,
  pageSize: number,
  totalItems: number,
): number {
  return Math.min(currentPage * pageSize, totalItems);
}
