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
    <div className={`p-6 border rounded-lg transition-all duration-200 ${
      isCompletedToday
        ? 'bg-green-50 border-green-200 hover:border-green-300'
        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{habit.title}</h3>
          <p className="text-sm text-gray-600">
            <span className="text-gray-500">After I:</span> {habit.trigger}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
            habit.current_streak > 0 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
          }`}>
            🔥 {habit.current_streak}
          </span>
        </div>
      </div>

      {habit.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{habit.description}</p>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md font-medium border border-gray-200">
            {habit.frequency}
          </span>
          {habit.best_streak > 0 && (
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium border border-blue-200">
              Best: {habit.best_streak}
            </span>
          )}
          {habit.linked_habit && (
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md font-medium border border-purple-200">
              → Chained
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(habit.id)}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
          >
            Details
          </button>
          <button
            onClick={() => onComplete(habit.id)}
            disabled={isCompletedToday}
            className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium ${
              isCompletedToday
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompletedToday ? '✓ Done' : 'Complete'}
          </button>
          <button
            onClick={handleDelete}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium ${
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