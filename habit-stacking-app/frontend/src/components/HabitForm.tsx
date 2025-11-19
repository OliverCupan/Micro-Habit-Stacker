import React, { useState } from 'react';
import { Habit, HabitFormValues } from '../types';

interface HabitFormProps {
  onSubmit: (habit: HabitFormValues) => void;
  initialHabit?: Habit;
  existingHabits?: Habit[];
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialHabit, existingHabits = [] }) => {
  const [title, setTitle] = useState(initialHabit?.title || '');
  const [description, setDescription] = useState(initialHabit?.description || '');
  const [trigger, setTrigger] = useState(initialHabit?.trigger || '');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(initialHabit?.frequency || 'daily');
  const [linkedHabitId, setLinkedHabitId] = useState<number | undefined>(initialHabit?.linked_habit_id);

  // Get unique triggers from existing habits
  const existingTriggers = [...new Set(existingHabits.map(h => h.trigger))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      trigger,
      frequency,
      linked_habit_id: linkedHabitId,
    });

    if (!initialHabit) {
      setTitle('');
      setDescription('');
      setTrigger('');
      setFrequency('daily');
      setLinkedHabitId(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
          Habit Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Do 10 pushups"
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="trigger" className="block text-sm font-medium text-gray-900 mb-1">
          Trigger (After I...) *
        </label>
        <input
          type="text"
          id="trigger"
          list="trigger-suggestions"
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          required
          placeholder="e.g., drink morning coffee"
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <datalist id="trigger-suggestions">
          {existingTriggers.map((existingTrigger, index) => (
            <option key={index} value={existingTrigger} />
          ))}
        </datalist>
        <p className="text-xs text-gray-600 mt-1">
          {existingTriggers.length > 0
            ? 'Choose from existing triggers or type a new one'
            : 'What existing action triggers this habit?'}
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details about this habit..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-900 mb-1">
          Frequency
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {existingHabits.length > 0 && (
        <div>
          <label htmlFor="linkedHabit" className="block text-sm font-medium text-gray-900 mb-1">
            Link to Next Habit (Optional)
          </label>
          <select
            id="linkedHabit"
            value={linkedHabitId || ''}
            onChange={(e) => setLinkedHabitId(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            {existingHabits
              .filter(h => h.id !== initialHabit?.id)
              .map(habit => (
                <option key={habit.id} value={habit.id}>
                  {habit.title}
                </option>
              ))}
          </select>
          <p className="text-xs text-gray-600 mt-1">Chain this habit to another habit</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
      >
        {initialHabit ? 'Update Habit' : 'Create Habit'}
      </button>
    </form>
  );
};

export default HabitForm;