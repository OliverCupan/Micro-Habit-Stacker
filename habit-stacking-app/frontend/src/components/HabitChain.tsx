import React from 'react';
import { Habit } from '../types';

interface HabitChainProps {
  chain: Habit[];
}

const HabitChain: React.FC<HabitChainProps> = ({ chain }) => {
  if (chain.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Habit Chain</h3>
      <div className="space-y-4">
        {chain.map((habit, index) => (
          <div key={habit.id} className="flex items-center">
            <div className="flex-1">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1.5 font-medium">
                      {index === 0 ? 'After I' : 'Then I'}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">{habit.trigger}</p>
                    <p className="font-medium text-gray-900">{habit.title}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-sm bg-white px-2.5 py-1 rounded-md border border-gray-200 font-medium text-gray-700">
                      🔥 {habit.current_streak}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {index < chain.length - 1 && (
              <div className="mx-4 text-xl text-gray-400">→</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6 text-center">
        Complete habits in order to build your chain 🔗
      </p>
    </div>
  );
};

export default HabitChain;
