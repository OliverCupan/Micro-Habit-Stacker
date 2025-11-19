import React from 'react';

interface HabitCardProps {
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ title, description, completed, onToggle }) => {
  return (
    <div className={`p-4 border rounded-lg shadow-md ${completed ? 'bg-green-100' : 'bg-white'}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={onToggle}
        className={`mt-2 px-4 py-2 rounded ${completed ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
      >
        {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default HabitCard;