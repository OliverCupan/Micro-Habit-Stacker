export interface Habit {
  id: number;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabitFormValues {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
}