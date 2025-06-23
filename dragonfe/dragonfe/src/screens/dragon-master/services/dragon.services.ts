import axios from 'axios';
import type { DragonResponse } from '../data/dragon.types';

const API_BASE = '/api/dragons';

export async function fetchAllDragons(): Promise<DragonResponse[]> {
  const res = await axios.get(API_BASE);
  return res.data;
}

export async function fetchDragonById(id: number): Promise<DragonResponse> {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
}

export async function createDragon(dragon: Omit<DragonResponse, "id" | "level" | "power">) {
  // Only send fields your backend expects (level and power are set automatically)
  return axios.post("/api/dragons", dragon);
}

export async function updateDragon(id: number, dragon: Partial<DragonResponse>) {
  return axios.put(`/api/dragons/${id}`, dragon);
}

export async function deleteDragon(id: number) {
  return axios.delete(`/api/dragons/${id}`);
}