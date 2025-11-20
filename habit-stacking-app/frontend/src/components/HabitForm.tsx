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
  const [useCustomTrigger, setUseCustomTrigger] = useState(false);

  // Get unique triggers from existing habits
  const existingTriggers = [...new Set(existingHabits.map(h => h.trigger))];

  const handleTriggerSelectChange = (value: string) => {
    if (value === '__custom__') {
      setUseCustomTrigger(true);
      setTrigger('');
    } else {
      setUseCustomTrigger(false);
      setTrigger(value);
    }
  };

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
      setUseCustomTrigger(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-lg border border-gray-200">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
          Habit Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Do 10 pushups"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="trigger" className="block text-sm font-medium text-gray-900 mb-2">
          Trigger (After I...) *
        </label>
        {existingTriggers.length > 0 && !useCustomTrigger ? (
          <select
            id="trigger"
            value={trigger || '__custom__'}
            onChange={(e) => handleTriggerSelectChange(e.target.value)}
            required
            className="w-full"
          >
            <option value="">Select a trigger</option>
            {existingTriggers.map((existingTrigger, index) => (
              <option key={index} value={existingTrigger}>
                {existingTrigger}
              </option>
            ))}
            <option value="__custom__">+ New custom trigger</option>
          </select>
        ) : (
          <div>
            <input
              type="text"
              id="trigger"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              required
              placeholder="e.g., drink morning coffee"
              className="w-full"
            />
            {existingTriggers.length > 0 && (
              <button
                type="button"
                onClick={() => setUseCustomTrigger(false)}
                className="text-xs text-blue-600 hover:text-blue-700 mt-2"
              >
                ← Choose from existing triggers
              </button>
            )}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">
          {existingTriggers.length > 0
            ? 'Choose from existing triggers or create a new one'
            : 'What existing action triggers this habit?'}
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details about this habit..."
          rows={3}
          className="w-full resize-none"
        />
      </div>

      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-900 mb-2">
          Frequency
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
          className="w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {existingHabits.length > 0 && (
        <div>
          <label htmlFor="linkedHabit" className="block text-sm font-medium text-gray-900 mb-2">
            Link to Next Habit (Optional)
          </label>
          <select
            id="linkedHabit"
            value={linkedHabitId || ''}
            onChange={(e) => setLinkedHabitId(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full"
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
          <p className="text-xs text-gray-500 mt-2">Chain this habit to another habit</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow"
      >
        {initialHabit ? 'Update Habit' : 'Create Habit'}
      </button>
    </form>
  );
};

export default HabitForm;