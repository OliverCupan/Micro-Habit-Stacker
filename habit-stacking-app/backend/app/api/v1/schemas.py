from pydantic import BaseModel
from typing import List, Optional

class HabitBase(BaseModel):
    title: str
    description: Optional[str] = None
    frequency: str

class HabitCreate(HabitBase):
    pass

class HabitUpdate(HabitBase):
    pass

class Habit(HabitBase):
    id: int

    class Config:
        orm_mode = True

class HabitList(BaseModel):
    habits: List[Habit]