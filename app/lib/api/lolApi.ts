import type {T} from "vue-router/dist/index-DFCq6eJK.js";

/**
 * Récupère tous les templates (objets ServiceNow) avec pagination
 */
export async function getTest(): Promise<T> {
  try {
    // const token = await getAccessToken();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    // const params = new URLSearchParams({
    //   pageNumber: pageIndex.toString(),
    //   pageSize: pageSize.toString(),
    // });

    // const response = await fetch(`${apiBaseUrl}/ObjectSnows?${params}`, {
    //   //   headers: {
    //   //     Authorization: `Bearer ${token}`,
    //   //   },
    // });

    const response = await fetch(`${apiBaseUrl}/Changelog`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error thrown: (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error while fetching templates:", error);
    throw new Error(
      `Error while fetching templates: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
