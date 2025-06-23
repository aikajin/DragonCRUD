import axios from "axios";

const ELEMENTS_ENDPOINT = "/api/dragons/enums/elements";
const RARITIES_ENDPOINT = "/api/dragons/enums/rarities";

export async function fetchElementTypes(): Promise<string[]> {
  try {
    const res = await axios.get<string[]>(ELEMENTS_ENDPOINT);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch element types:", error);
    return [];
  }
}

export async function fetchRarities(): Promise<string[]> {
  try {
    const res = await axios.get<string[]>(RARITIES_ENDPOINT);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch rarities:", error);
    return [];
  }
}