from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from app.api.v1 import schemas, crud
from app.db.session import SessionLocal
from datetime import date

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Habit endpoints
@router.post("/habits/", response_model=schemas.HabitRead)
def create_habit_endpoint(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    return crud.create_habit(db=db, habit=habit)

@router.get("/habits/", response_model=List[schemas.HabitRead])
def read_habits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    habits = crud.get_habits(db, skip=skip, limit=limit)
    return habits

@router.get("/habits/{habit_id}", response_model=schemas.HabitWithLinked)
def read_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = crud.get_habit(db, habit_id=habit_id)
    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit

@router.put("/habits/{habit_id}", response_model=schemas.HabitRead)
def update_habit_endpoint(habit_id: int, habit: schemas.HabitUpdate, db: Session = Depends(get_db)):
    db_habit = crud.update_habit(db, habit_id=habit_id, habit=habit)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit

@router.delete("/habits/{habit_id}", response_model=schemas.HabitRead)
def delete_habit_endpoint(habit_id: int, db: Session = Depends(get_db)):
    db_habit = crud.delete_habit(db, habit_id=habit_id)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit

# Habit chain endpoint
@router.get("/habits/{habit_id}/chain", response_model=List[schemas.HabitRead])
def get_habit_chain(habit_id: int, db: Session = Depends(get_db)):
    chain = crud.get_habit_chain(db, habit_id=habit_id)
    if not chain:
        raise HTTPException(status_code=404, detail="Habit not found")
    return chain

# Completion endpoints
@router.post("/habits/{habit_id}/complete", response_model=schemas.CompletionRead)
def complete_habit(
    habit_id: int,
    completion: schemas.CompletionCreate,
    db: Session = Depends(get_db)
):
    habit = crud.get_habit(db, habit_id=habit_id)
    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")

    return crud.create_completion(
        db=db,
        habit_id=habit_id,
        completion_date=completion.completed_date
    )

@router.get("/habits/{habit_id}/completions", response_model=List[schemas.CompletionRead])
def get_habit_completions(habit_id: int, db: Session = Depends(get_db)):
    habit = crud.get_habit(db, habit_id=habit_id)
    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")

    return crud.get_completions(db, habit_id=habit_id)

@router.delete("/habits/{habit_id}/completions/{completion_date}")
def delete_habit_completion(
    habit_id: int,
    completion_date: date,
    db: Session = Depends(get_db)
):
    completion = crud.delete_completion(db, habit_id=habit_id, completion_date=completion_date)
    if completion is None:
        raise HTTPException(status_code=404, detail="Completion not found")
    return {"message": "Completion deleted successfully"}

# Statistics endpoints
@router.get("/habits/{habit_id}/stats", response_model=schemas.HabitStats)
def get_habit_statistics(habit_id: int, db: Session = Depends(get_db)):
    stats = crud.get_habit_stats(db, habit_id=habit_id)
    if stats is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return stats

@router.get("/stats/overall", response_model=schemas.OverallStats)
def get_overall_statistics(db: Session = Depends(get_db)):
    return crud.get_overall_stats(db)