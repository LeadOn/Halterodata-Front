import {describe, expect, it} from "vitest";
import {getEndIndex, getVisiblePages} from "~/lib/utils/pagination";

describe("getVisiblePages", () => {
  it("liste toutes les pages sans élision en deçà de 8 pages", () => {
    expect(getVisiblePages(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("rend un tableau vide quand il n'y a aucune page", () => {
    expect(getVisiblePages(1, 0)).toEqual([]);
  });

  it("élude la fin quand on est au début", () => {
    expect(getVisiblePages(2, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis", 20]);
  });

  it("élude le début quand on est à la fin", () => {
    expect(getVisiblePages(19, 20)).toEqual([
      1,
      "ellipsis",
      16,
      17,
      18,
      19,
      20,
    ]);
  });

  it("élude des deux côtés au milieu", () => {
    expect(getVisiblePages(10, 20)).toEqual([
      1,
      "ellipsis",
      9,
      10,
      11,
      "ellipsis",
      20,
    ]);
  });

  it("borne une page courante hors limites", () => {
    expect(getVisiblePages(999, 20)).toEqual(getVisiblePages(20, 20));
    expect(getVisiblePages(-5, 20)).toEqual(getVisiblePages(1, 20));
  });

  it("ne produit jamais de numéro hors bornes", () => {
    for (let total = 1; total <= 30; total++) {
      for (let current = 1; current <= total; current++) {
        const numbers = getVisiblePages(current, total).filter(
          (item): item is number => item !== "ellipsis",
        );
        expect(Math.min(...numbers)).toBeGreaterThanOrEqual(1);
        expect(Math.max(...numbers)).toBeLessThanOrEqual(total);
      }
    }
  });
});

describe("getEndIndex", () => {
  it("borne le dernier index au total d'éléments", () => {
    expect(getEndIndex(3, 20, 45)).toBe(45);
  });

  it("rend la fin de page quand elle est pleine", () => {
    expect(getEndIndex(2, 20, 100)).toBe(40);
  });

  it("rend 0 quand il n'y a aucun élément", () => {
    expect(getEndIndex(1, 20, 0)).toBe(0);
  });
});
