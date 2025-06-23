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