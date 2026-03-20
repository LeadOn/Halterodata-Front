import type {AthleteDto} from "../types/AthleteDto";

export async function getAthleteById(id: number): Promise<AthleteDto | null> {
  try {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/athlete/${id}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error thrown: (${response.status}): ${errorText}`);
    }

    return (await response.json()) as AthleteDto;
  } catch (error) {
    console.error("Error while fetching athlete by ID:", error);
    throw new Error(
      `Error while fetching athlete by ID: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
