import type {AthleteDto} from "../types/AthleteDto";
import {parseAthlete} from "../utils/apiParsers";
import {apiRequest} from "./config";

/**
 * `GET /athlete/{id}`
 *
 * @throws Erreur Nuxt 404 si l'athlète n'existe pas.
 */
export function getAthleteById(id: number): Promise<AthleteDto> {
  return apiRequest(`/athlete/${id}`, parseAthlete);
}
