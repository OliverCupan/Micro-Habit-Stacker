import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: number) => void;
  onDelete: (habitId: number) => void;
  onViewDetails: (habitId: number) => void;
  isCompletedToday: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onComplete,
  onDelete,
  onViewDetails,
  isCompletedToday,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(habit.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className={`p-6 border-2 rounded-2xl shadow-lg transition-all ${
      isCompletedToday ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{habit.title}</h3>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium text-gray-900">After I:</span> {habit.trigger}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            habit.current_streak > 0 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'
          }`}>
            🔥 {habit.current_streak} day{habit.current_streak !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {habit.description && (
        <p className="text-gray-700 text-sm mb-3">{habit.description}</p>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex gap-2 text-xs text-gray-700">
          <span className="px-2 py-1 bg-gray-100 rounded-xl">
            {habit.frequency}
          </span>
          {habit.best_streak > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-xl">
              Best: {habit.best_streak}
            </span>
          )}
          {habit.linked_habit && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-xl">
              → Chained
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(habit.id)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onComplete(habit.id)}
            disabled={isCompletedToday}
            className={`px-4 py-1 text-sm rounded-xl transition-colors ${
              isCompletedToday
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompletedToday ? '✓ Done Today' : 'Complete'}
          </button>
          <button
            onClick={handleDelete}
            className={`px-3 py-1 text-sm rounded-xl transition-colors ${
              showDeleteConfirm
                ? 'bg-red-600 text-white'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            {showDeleteConfirm ? 'Confirm?' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;