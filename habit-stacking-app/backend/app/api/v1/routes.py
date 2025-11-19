from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas import HabitCreate, HabitRead
from ..crud import create_habit, get_habit, get_habits

router = APIRouter()

@router.post("/habits/", response_model=HabitRead)
async def create_habit_endpoint(habit: HabitCreate):
    return await create_habit(habit)

@router.get("/habits/", response_model=List[HabitRead])
async def read_habits():
    return await get_habits()

@router.get("/habits/{habit_id}", response_model=HabitRead)
async def read_habit(habit_id: int):
    habit = await get_habit(habit_id)
    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit