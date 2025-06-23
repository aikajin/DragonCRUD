import { useEffect, useState } from 'react';
import type { DragonResponse } from '../data/dragon.types';
import { fetchAllDragons } from '../services/dragon.services';

export function useDragons() {
  const [dragons, setDragons] = useState<DragonResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllDragons()
      .then(setDragons)
      .finally(() => setLoading(false));
  }, []);

  return { dragons, loading };
}