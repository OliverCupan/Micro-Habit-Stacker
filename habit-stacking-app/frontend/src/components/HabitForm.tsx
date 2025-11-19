import React, { useState } from 'react';

const HabitForm = ({ onSubmit, initialHabit }) => {
  const [habitName, setHabitName] = useState(initialHabit ? initialHabit.name : '');
  const [habitDescription, setHabitDescription] = useState(initialHabit ? initialHabit.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: habitName, description: habitDescription });
    setHabitName('');
    setHabitDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="habitName" className="block text-sm font-medium text-gray-700">
          Habit Name
        </label>
        <input
          type="text"
          id="habitName"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="habitDescription" className="block text-sm font-medium text-gray-700">
          Habit Description
        </label>
        <textarea
          id="habitDescription"
          value={habitDescription}
          onChange={(e) => setHabitDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {initialHabit ? 'Update Habit' : 'Add Habit'}
      </button>
    </form>
  );
};

export default HabitForm;