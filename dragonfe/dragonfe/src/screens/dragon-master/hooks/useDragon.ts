import { useEffect, useState, useCallback } from 'react';
import type { DragonResponse } from '../data/dragon.types';
import { fetchAllDragons } from '../services/dragon.services';

export function useDragons() {
  const [dragons, setDragons] = useState<DragonResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDragons = useCallback(() => {
    setLoading(true);
    fetchAllDragons()
      .then(setDragons)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadDragons();
  }, [loadDragons]);

  return { dragons, loading, refetch: loadDragons };
}

export function useDragonById(id: number) {
  const [dragon, setDragon] = useState<DragonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (id <= 0) {
      setLoading(false);
      return;
    }

    fetchAllDragons()
      .then(dragons => {
        const foundDragon = dragons.find(d => d.id === id);
        setDragon(foundDragon || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { dragon, loading };
}