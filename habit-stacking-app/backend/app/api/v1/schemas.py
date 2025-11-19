from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date

# Habit Schemas
class HabitBase(BaseModel):
    title: str
    description: Optional[str] = None
    trigger: str
    frequency: str = 'daily'

class HabitCreate(HabitBase):
    linked_habit_id: Optional[int] = None

class HabitUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    trigger: Optional[str] = None
    frequency: Optional[str] = None
    linked_habit_id: Optional[int] = None

class HabitRead(HabitBase):
    id: int
    current_streak: int
    best_streak: int
    linked_habit_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class HabitWithLinked(HabitRead):
    linked_habit: Optional[HabitRead] = None

    class Config:
        orm_mode = True

# Completion Schemas
class CompletionBase(BaseModel):
    habit_id: int
    completed_date: date

class CompletionCreate(BaseModel):
    completed_date: Optional[date] = None

class CompletionRead(CompletionBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Statistics Schemas
class HabitStats(BaseModel):
    habit_id: int
    title: str
    total_completions: int
    current_streak: int
    best_streak: int
    completion_rate: float
    last_completed: Optional[date] = None

class OverallStats(BaseModel):
    total_habits: int
    active_streaks: int
    total_completions: int
    average_streak: float