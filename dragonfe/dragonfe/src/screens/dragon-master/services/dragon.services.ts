import axios from 'axios';
import type { DragonResponse } from '../data/dragon.types';

const API_BASE = '/api/dragons';

// Fetch all dragons
export async function fetchAllDragons(): Promise<DragonResponse[]> {
  const res = await axios.get(API_BASE);
  return res.data;
}

// Fetch a single dragon by ID
export async function fetchDragonById(id: number): Promise<DragonResponse> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
}

// Create a new dragon (no image)
export async function createDragon(dragon: Omit<DragonResponse, "id" | "level" | "power">) {
  return axios.post(API_BASE, dragon);
}

// Create a new dragon with image upload
export async function uploadDragonWithImage(values: any) {
  const formData = new FormData();
  const { dragonPic, ...dragonData } = values;
  formData.append("dragon", JSON.stringify(dragonData));
  if (dragonPic && dragonPic[0]?.originFileObj) {
    formData.append("image", dragonPic[0].originFileObj);
  }
  return axios.post(API_BASE, formData);
}

// Update a dragon with image upload
export async function updateDragonWithImage(id: number, values: any) {
  const formData = new FormData();
  const dragonData: any = {
    name: values.name,
    elementType: values.elementType,
    rarity: values.rarity,
    description: values.description,
  };
  formData.append("dragon", JSON.stringify(dragonData));
  if (values.dragonPic && values.dragonPic[0]?.originFileObj) {
    formData.append("image", values.dragonPic[0].originFileObj);
  }
  return axios.put(`${API_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}

// Delete a dragon by ID
export async function deleteDragon(id: number) {
  return axios.delete(`${API_BASE}/${id}`);
}

// Search dragons by name
export async function searchDragonsByName(name: string): Promise<DragonResponse[]> {
  const res = await axios.get(`${API_BASE}/search`, { params: { name } });
  return res.data;
}

// Fetch top dragons
export async function fetchTopDragons(): Promise<DragonResponse[]> {
  const res = await axios.get(`${API_BASE}/top`);
  return res.data;
}

// Fetch dragon statistics
export async function fetchDragonStats(): Promise<any> {
  const res = await axios.get(`${API_BASE}/stats`);
  return res.data;
}

// Fetch available element types
export async function fetchElementTypes(): Promise<string[]> {
  const res = await axios.get(`${API_BASE}/enums/elements`);
  return res.data;
}

// Fetch available rarities
export async function fetchRarities(): Promise<string[]> {
  const res = await axios.get(`${API_BASE}/enums/rarities`);
  return res.data;
}

// Fetch dragons by element
export async function fetchDragonsByElement(element: string): Promise<DragonResponse[]> {
  const res = await axios.get(`${API_BASE}/element/${element}`);
  return res.data;
}

// Fetch dragons by rarity
export async function fetchDragonsByRarity(rarity: string): Promise<DragonResponse[]> {
  const res = await axios.get(`${API_BASE}/rarity/${rarity}`);
  return res.data;
}