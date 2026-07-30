import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tuagente_visitors';
const SESSION_KEY = 'tuagente_session_counted';

const seedVisitors = () => {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) return data;
  }
  return {
    date: today,
    total: 12480,
    today: 142,
    sessions: 0,
  };
};

const useVisitors = () => {
  const [stats, setStats] = useState({ total: 0, today: 0, sessions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      let data = seedVisitors();
      const sessionCounted = sessionStorage.getItem(SESSION_KEY);

      data.today += 1;
      data.total += 1;

      if (!sessionCounted) {
        data.sessions += 1;
        sessionStorage.setItem(SESSION_KEY, '1');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStats({ total: data.total, today: data.today, sessions: data.sessions });
    } catch (e) {
      setStats({ total: 0, today: 0, sessions: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  return { ...stats, loading };
};

export default useVisitors;
