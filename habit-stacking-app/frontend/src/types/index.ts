export interface Habit {
  id: number;
  title: string;
  description?: string;
  trigger: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  current_streak: number;
  best_streak: number;
  linked_habit_id?: number;
  linked_habit?: Habit;
  created_at: string;
  updated_at: string;
}

export interface HabitFormValues {
  title: string;
  description?: string;
  trigger: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  linked_habit_id?: number;
}

export interface Completion {
  id: number;
  habit_id: number;
  completed_date: string;
  created_at: string;
}

export interface HabitStats {
  habit_id: number;
  title: string;
  total_completions: number;
  current_streak: number;
  best_streak: number;
  completion_rate: number;
  last_completed?: string;
}

export interface OverallStats {
  total_habits: number;
  active_streaks: number;
  total_completions: number;
  average_streak: number;
}