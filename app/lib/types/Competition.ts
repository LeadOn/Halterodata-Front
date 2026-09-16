import type {CompetitionDetail} from "./CompetitionDetail";

/** État d'une compétition (`CompetitionState` côté API). */
export const CompetitionState = {
  InProgress: 0,
  Finished: 1,
} as const;

export type CompetitionState =
  (typeof CompetitionState)[keyof typeof CompetitionState];

/** Genre d'une compétition. */
export const CompetitionGender = {
  Male: 0,
  Female: 1,
  Mixed: 2,
} as const;

export type CompetitionGender =
  (typeof CompetitionGender)[keyof typeof CompetitionGender];

/** Compétition en liste (`GET /competition`), sans le détail des résultats. */
export interface CompetitionDto {
  id: number;
  scoresheetId: number;
  seasonId: number | null;
  name: string | null;
  gender: number;
  league: string | null;
  /** `true` = compétition par équipes, `false` = individuelle. */
  type: boolean;
  /** Date ISO renvoyée par l'API, non parsée. */
  date: string | null;
  state: number;
}

/** Compétition détaillée (`GET /competition/{id}`), résultats inclus. */
export interface CompetitionDetailedDto extends CompetitionDto {
  details: CompetitionDetail[];
}
