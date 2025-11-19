import { useEffect, useState } from 'react';
import { Habit } from '../types';

const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits');
      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }
      const data = await response.json();
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (newHabit: Habit) => {
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHabit),
      });
      if (!response.ok) {
        throw new Error('Failed to add habit');
      }
      const addedHabit = await response.json();
      setHabits((prev) => [...prev, addedHabit]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateHabit = async (updatedHabit: Habit) => {
    try {
      const response = await fetch(`/api/habits/${updatedHabit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHabit),
      });
      if (!response.ok) {
        throw new Error('Failed to update habit');
      }
      const updatedData = await response.json();
      setHabits((prev) =>
        prev.map((habit) => (habit.id === updatedData.id ? updatedData : habit))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { habits, loading, error, addHabit, updateHabit, deleteHabit };
};

export default useHabits;