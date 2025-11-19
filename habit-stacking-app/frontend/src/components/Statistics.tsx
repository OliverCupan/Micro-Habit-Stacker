import React from 'react';
import { OverallStats } from '../types';

interface StatisticsProps {
  stats: OverallStats;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Habits</p>
            <p className="text-3xl font-bold mt-1">{stats.total_habits}</p>
          </div>
          <div className="text-4xl opacity-80">📝</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Active Streaks</p>
            <p className="text-3xl font-bold mt-1">{stats.active_streaks}</p>
          </div>
          <div className="text-4xl opacity-80">🔥</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Completions</p>
            <p className="text-3xl font-bold mt-1">{stats.total_completions}</p>
          </div>
          <div className="text-4xl opacity-80">✓</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Avg. Streak</p>
            <p className="text-3xl font-bold mt-1">{stats.average_streak.toFixed(1)}</p>
          </div>
          <div className="text-4xl opacity-80">📊</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
