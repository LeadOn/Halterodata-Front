import type {StatRecapDto} from "./StatRecapDto";

/**
 * Athlète tel que renvoyé par `GET /athlete/{id}`.
 */
export interface AthleteDto {
  id: number;
  licenceId: number;
  fullName: string | null;
  /** `null` si absente ou si l'API renvoie la date sentinelle `0001-01-01`. */
  birthDate: string | null;
  countryCode: string | null;
  currentClub: string | null;
  lastStats: StatRecapDto | null;
  bestStats: StatRecapDto | null;
}
