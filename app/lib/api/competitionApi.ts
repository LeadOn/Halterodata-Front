import type {CompetitionSearchResultDto} from "../types/CompetitionSearchResultDto";

export async function getCompetitions(
  page: number = 1,
  size: number = 10,
  keywords?: string,
): Promise<CompetitionSearchResultDto | null> {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(
      `${apiBaseUrl}/competition?page=${page}&size=${size}&keywords=${keywords ?? ""}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error thrown: (${response.status}): ${errorText}`);
    }

    return (await response.json()) as CompetitionSearchResultDto;
  } catch (error) {
    console.error("Error while fetching competitions:", error);
    throw new Error(
      `Error while fetching competitions: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getCompetitionsByAthleteId(
  athleteId: number,
  page: number = 1,
  size: number = 10,
  keywords?: string,
): Promise<CompetitionSearchResultDto | null> {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(
      `${apiBaseUrl}/athlete/${athleteId}/competition?page=${page}&size=${size}&keywords=${keywords ?? ""}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error thrown: (${response.status}): ${errorText}`);
    }

    return (await response.json()) as CompetitionSearchResultDto;
  } catch (error) {
    console.error("Error while fetching competitions:", error);
    throw new Error(
      `Error while fetching competitions: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
