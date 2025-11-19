import React from 'react';
import Layout from '../../components/Layout';
import HabitCard from '../../components/HabitCard';
import { useHabits } from '../../hooks/useHabits';

const HabitsPage = () => {
  const { habits, isLoading, error } = useHabits();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading habits: {error.message}</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </Layout>
  );
};

export default HabitsPage;