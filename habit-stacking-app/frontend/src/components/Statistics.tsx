import React from 'react';
import { OverallStats } from '../types';

interface StatisticsProps {
  stats: OverallStats;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white border border-blue-200 p-6 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Total Habits</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.total_habits}</p>
          </div>
          <div className="text-3xl opacity-80">📝</div>
        </div>
      </div>

      <div className="bg-white border border-green-200 p-6 rounded-lg hover:border-green-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Active Streaks</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.active_streaks}</p>
          </div>
          <div className="text-3xl opacity-80">🔥</div>
        </div>
      </div>

      <div className="bg-white border border-purple-200 p-6 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">Total Completions</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.total_completions}</p>
          </div>
          <div className="text-3xl opacity-80">✓</div>
        </div>
      </div>

      <div className="bg-white border border-orange-200 p-6 rounded-lg hover:border-orange-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">Avg. Streak</p>
            <p className="text-3xl font-semibold text-gray-900">{stats.average_streak.toFixed(1)}</p>
          </div>
          <div className="text-3xl opacity-80">📊</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
