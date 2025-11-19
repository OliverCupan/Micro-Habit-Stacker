import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import HabitChain from '../../components/HabitChain';
import { habitApi } from '../../utils/api';
import { Habit, HabitStats, Completion } from '../../types';

const HabitDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [habit, setHabit] = useState<Habit | null>(null);
  const [chain, setChain] = useState<Habit[]>([]);
  const [stats, setStats] = useState<HabitStats | null>(null);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadHabitData();
    }
  }, [id]);

  const loadHabitData = async () => {
    try {
      setLoading(true);
      const habitId = Number(id);

      const [habitData, chainData, statsData, completionsData] = await Promise.all([
        habitApi.getById(habitId),
        habitApi.getChain(habitId),
        habitApi.getStats(habitId),
        habitApi.getCompletions(habitId),
      ]);

      setHabit(habitData);
      setChain(chainData);
      setStats(statsData);
      setCompletions(completionsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load habit');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await habitApi.complete(Number(id));
      loadHabitData();
    } catch (err: any) {
      alert('Failed to complete habit: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteCompletion = async (date: string) => {
    try {
      await habitApi.deleteCompletion(Number(id), date);
      loadHabitData();
    } catch (err: any) {
      alert('Failed to delete completion: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !habit) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Error: {error || 'Habit not found'}</div>
        </div>
      </Layout>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = completions.some(c => c.completed_date === today);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/habits')}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Habits
        </button>

        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{habit.title}</h1>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-medium">After I:</span> {habit.trigger}
          </p>
          {habit.description && (
            <p className="text-gray-700 mb-4">{habit.description}</p>
          )}

          <div className="flex gap-4 mb-6">
            <span className="px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-600">Frequency:</span>{' '}
              <span className="font-semibold">{habit.frequency}</span>
            </span>
            <span className="px-4 py-2 bg-orange-100 rounded-lg">
              <span className="text-sm text-gray-600">Current Streak:</span>{' '}
              <span className="font-semibold text-orange-700">🔥 {habit.current_streak} days</span>
            </span>
            <span className="px-4 py-2 bg-blue-100 rounded-lg">
              <span className="text-sm text-gray-600">Best Streak:</span>{' '}
              <span className="font-semibold text-blue-700">{habit.best_streak} days</span>
            </span>
          </div>

          <button
            onClick={handleComplete}
            disabled={isCompletedToday}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isCompletedToday
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompletedToday ? '✓ Completed Today!' : 'Mark as Complete'}
          </button>
        </div>

        {chain.length > 1 && (
          <div className="mb-6">
            <HabitChain chain={chain} />
          </div>
        )}

        {stats && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">{stats.total_completions}</p>
                <p className="text-sm text-gray-600">Total Completions</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{stats.completion_rate}%</p>
                <p className="text-sm text-gray-600">30-Day Rate</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-700">{stats.current_streak}</p>
                <p className="text-sm text-gray-600">Current Streak</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-700">{stats.best_streak}</p>
                <p className="text-sm text-gray-600">Best Streak</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Completion History</h2>
          {completions.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No completions yet. Start building your streak!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {completions.map((completion) => (
                <div
                  key={completion.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-700">
                    {new Date(completion.completed_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => handleDeleteCompletion(completion.completed_date)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HabitDetail;