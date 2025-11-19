import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import HabitCard from '../../components/HabitCard';
import HabitForm from '../../components/HabitForm';
import Statistics from '../../components/Statistics';
import { habitApi, statsApi } from '../../utils/api';
import { Habit, HabitFormValues, OverallStats, Completion } from '../../types';

const HabitsPage: React.FC = () => {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Record<number, Completion[]>>({});
  const [stats, setStats] = useState<OverallStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [habitsData, statsData] = await Promise.all([
        habitApi.getAll(),
        statsApi.getOverall(),
      ]);

      setHabits(habitsData);
      setStats(statsData);

      // Load completions for each habit
      const completionsData: Record<number, Completion[]> = {};
      for (const habit of habitsData) {
        const habitCompletions = await habitApi.getCompletions(habit.id);
        completionsData[habit.id] = habitCompletions;
      }
      setCompletions(completionsData);

    } catch (err: any) {
      setError(err.message || 'Failed to load habits');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateHabit = async (habitData: HabitFormValues) => {
    try {
      await habitApi.create(habitData);
      setShowForm(false);
      loadData();
    } catch (err: any) {
      alert('Failed to create habit: ' + (err.message || 'Unknown error'));
    }
  };

  const handleCompleteHabit = async (habitId: number) => {
    try {
      await habitApi.complete(habitId);
      loadData();
    } catch (err: any) {
      alert('Failed to complete habit: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteHabit = async (habitId: number) => {
    try {
      await habitApi.delete(habitId);
      loadData();
    } catch (err: any) {
      alert('Failed to delete habit: ' + (err.message || 'Unknown error'));
    }
  };

  const handleViewDetails = (habitId: number) => {
    router.push(`/habits/${habitId}`);
  };

  const isCompletedToday = (habitId: number): boolean => {
    const today = new Date().toISOString().split('T')[0];
    const habitCompletions = completions[habitId] || [];
    return habitCompletions.some(c => c.completed_date === today);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Habits</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Habit'}
          </button>
        </div>

        {stats && <Statistics stats={stats} />}

        {showForm && (
          <div className="mb-6">
            <HabitForm
              onSubmit={handleCreateHabit}
              existingHabits={habits}
            />
          </div>
        )}

        {habits.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No habits yet. Create your first habit to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={handleCompleteHabit}
                onDelete={handleDeleteHabit}
                onViewDetails={handleViewDetails}
                isCompletedToday={isCompletedToday(habit.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HabitsPage;