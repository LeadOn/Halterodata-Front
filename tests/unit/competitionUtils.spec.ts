import {describe, expect, it} from "vitest";
import {
  formatCompetitionDate,
  formatListDate,
  getAttemptClass,
  getAttemptDisplay,
  getBirthYear,
  getGenderLabel,
  getStatusLabel,
  getTypeLabel,
  truncateForTitle,
} from "~/lib/utils/competition";

describe("getAttemptDisplay", () => {
  // Convention Scoresheet : positif = réussi, négatif = manqué, 0/null = non tenté.
  it("affiche un essai réussi tel quel", () => {
    expect(getAttemptDisplay(121)).toBe("121");
  });

  it("affiche un essai manqué entre parenthèses, en valeur absolue", () => {
    expect(getAttemptDisplay(-36)).toBe("(36)");
  });

  it("affiche un tiret pour un essai non tenté", () => {
    expect(getAttemptDisplay(0)).toBe("—");
    expect(getAttemptDisplay(null)).toBe("—");
  });
});

describe("getAttemptClass", () => {
  it("distingue réussite, échec et essai non tenté", () => {
    expect(getAttemptClass(121)).toContain("success");
    expect(getAttemptClass(-36)).toContain("danger");
    expect(getAttemptClass(null)).toContain("textMuted");
    expect(getAttemptClass(0)).toContain("textMuted");
  });
});

describe("getBirthYear", () => {
  it("rend l'année d'une date valide", () => {
    expect(getBirthYear("1996-04-12T00:00:00")).toBe(1996);
  });

  it("rend null pour une date absente ou invalide", () => {
    expect(getBirthYear(null)).toBeNull();
    expect(getBirthYear("pas une date")).toBeNull();
  });
});

describe("formatage des dates", () => {
  it("formate une date de compétition au format court", () => {
    expect(formatCompetitionDate("2026-08-08T00:00:00")).toBe("08/08/2026");
  });

  it("formate une date de liste au format long", () => {
    expect(formatListDate("2026-08-08T00:00:00")).toContain("2026");
  });

  it("rend un tiret quand la date est absente ou invalide", () => {
    expect(formatCompetitionDate(null)).toBe("—");
    expect(formatListDate("pas une date")).toBe("—");
  });
});

describe("libellés", () => {
  it("traduit les états de compétition", () => {
    expect(getStatusLabel(0)).toBe("En cours");
    expect(getStatusLabel(1)).toBe("Terminée");
    expect(getStatusLabel(42)).toBe("Inconnu");
  });

  it("traduit les genres", () => {
    expect(getGenderLabel(0)).toBe("Masculin");
    expect(getGenderLabel(1)).toBe("Féminin");
    expect(getGenderLabel(2)).toBe("Mixte");
    expect(getGenderLabel(9)).toBe("N/A");
  });

  it("traduit le type de compétition", () => {
    expect(getTypeLabel(true)).toBe("En équipe");
    expect(getTypeLabel(false)).toBe("Individuelle");
  });
});

describe("truncateForTitle", () => {
  it("laisse un titre court intact", () => {
    expect(truncateForTitle("Championnat de Bretagne")).toBe(
      "Championnat de Bretagne",
    );
  });

  it("coupe sur une limite de mot et ajoute une ellipse", () => {
    const long =
      "HDF - Championnats d'Europe Masters - Waregem - HDF - Championnats d'Europe Masters - Waregem - Femmes";
    const result = truncateForTitle(long);

    expect(result.length).toBeLessThanOrEqual(61);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toContain("  ");
  });

  it("coupe brutalement quand le premier mot dépasse déjà la limite", () => {
    const result = truncateForTitle("A".repeat(100), 20);

    expect(result).toBe(`${"A".repeat(20)}…`);
  });
});
