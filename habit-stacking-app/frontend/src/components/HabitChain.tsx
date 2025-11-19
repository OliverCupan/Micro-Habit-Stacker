import React from 'react';
import { Habit } from '../types';

interface HabitChainProps {
  chain: Habit[];
}

const HabitChain: React.FC<HabitChainProps> = ({ chain }) => {
  if (chain.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Habit Chain</h3>
      <div className="space-y-3">
        {chain.map((habit, index) => (
          <div key={habit.id} className="flex items-center">
            <div className="flex-1">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700 mb-1">
                      {index === 0 ? 'After I' : 'Then I'}: <span className="font-medium text-gray-900">{habit.trigger}</span>
                    </p>
                    <p className="font-semibold text-gray-900">{habit.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-white px-2 py-1 rounded-xl border border-gray-300">
                      🔥 {habit.current_streak}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {index < chain.length - 1 && (
              <div className="mx-4 text-2xl text-blue-500">→</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-4 text-center">
        Complete habits in order to build your chain! 🔗
      </p>
    </div>
  );
};

export default HabitChain;
