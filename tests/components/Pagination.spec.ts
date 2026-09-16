import {mountSuspended} from "@nuxt/test-utils/runtime";
import {describe, expect, it} from "vitest";
import Pagination from "~/components/ui/Pagination.vue";

const baseProps = {
  currentPage: 3,
  pageSize: 20,
  totalItems: 511,
  totalPages: 26,
  itemLabel: "compétitions",
};

describe("UiPagination", () => {
  it("annonce la plage affichée", async () => {
    const component = await mountSuspended(Pagination, {props: baseProps});

    expect(component.text()).toContain("41");
    expect(component.text()).toContain("60");
    expect(component.text()).toContain("511");
  });

  it("marque la page courante pour les lecteurs d'écran", async () => {
    const component = await mountSuspended(Pagination, {props: baseProps});
    const current = component.find('[aria-current="page"]');

    expect(current.text()).toBe("3");
  });

  it("émet la page demandée", async () => {
    const component = await mountSuspended(Pagination, {props: baseProps});

    await component.find('[aria-label="Page suivante"]').trigger("click");

    expect(component.emitted("page-change")?.[0]).toEqual([4]);
  });

  it("désactive « Précédent » sur la première page", async () => {
    const component = await mountSuspended(Pagination, {
      props: {...baseProps, currentPage: 1},
    });

    expect(
      component.find('[aria-label="Page précédente"]').attributes("disabled"),
    ).toBeDefined();
  });

  it("désactive « Suivant » sur la dernière page", async () => {
    const component = await mountSuspended(Pagination, {
      props: {...baseProps, currentPage: 26},
    });

    expect(
      component.find('[aria-label="Page suivante"]').attributes("disabled"),
    ).toBeDefined();
  });

  it("n'émet rien pour une page hors bornes", async () => {
    const component = await mountSuspended(Pagination, {
      props: {...baseProps, currentPage: 1},
    });

    await component.find('[aria-label="Page précédente"]').trigger("click");

    expect(component.emitted("page-change")).toBeUndefined();
  });

  it("affiche 0 à 0 quand il n'y a aucun élément", async () => {
    const component = await mountSuspended(Pagination, {
      props: {...baseProps, currentPage: 1, totalItems: 0, totalPages: 0},
    });

    expect(component.text()).toContain("Affichage de 0");
  });
});
