import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../../lib/apiClient';
import Layout from '../../components/Layout';

const HabitDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchHabit = async () => {
        try {
          const response = await apiClient.get(`/habits/${id}`);
          setHabit(response.data);
        } catch (error) {
          console.error('Error fetching habit:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHabit();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!habit) {
    return <div>Habit not found</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{habit.name}</h1>
      <p>{habit.description}</p>
      <p>Frequency: {habit.frequency}</p>
      <p>Streak: {habit.streak}</p>
    </Layout>
  );
};

export default HabitDetail;