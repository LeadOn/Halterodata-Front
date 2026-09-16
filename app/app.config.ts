/**
 * Configuration éditoriale de l'application.
 *
 * Y placer ce qui relève du contenu et non du code. Aucune donnée métier ne
 * doit être codée en dur dans un composant.
 */
export default defineAppConfig({
  /** Athlètes mis en avant sur la page d'accueil, dans l'ordre d'affichage. */
  pinnedAthletes: [
    {id: 4210, photo: "/img/athletes/gregoire-aubertin.jpg"},
    {id: 1, photo: "/img/athletes/bastien-bonnamant.png"},
  ] as PinnedAthlete[],
});

export interface PinnedAthlete {
  id: number;
  /** Chemin public de la photo d'illustration. */
  photo: string;
}
