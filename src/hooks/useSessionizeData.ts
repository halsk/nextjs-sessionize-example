import { SessionGrid, fetchSessionizeGrids } from '@/sessionize/sessionizeApi';
import { useState, useEffect, useRef } from 'react';

const useSessionizeGrids = (id: string) => {
  const [grids, setGrids] = useState<SessionGrid[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async (id: string) => {
    try {
      // fetch data from sessionize
      const grids = await fetchSessionizeGrids(id);
      setGrids(grids);
      setLoading(false);
    } catch (error) {
      // if error is instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
      setLoading(false);
    }
  };

  // useRef for avoiding useEffect to run twice
  const effectRan = useRef(false)
  useEffect(() => {

    if (effectRan.current === false) {
      fetchSessions(id);
      return () => {
        effectRan.current = true
      }
    }
  }, [id]);

  return { grids, isLoading, error };
};

export default useSessionizeGrids;
