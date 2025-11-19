from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db import models
from app.api.v1 import schemas
from datetime import date, datetime, timedelta
from typing import List, Optional

# Habit CRUD
def get_habit(db: Session, habit_id: int):
    return db.query(models.Habit).filter(models.Habit.id == habit_id).first()

def get_habits(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Habit).offset(skip).limit(limit).all()

def create_habit(db: Session, habit: schemas.HabitCreate):
    db_habit = models.Habit(**habit.dict())
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

def update_habit(db: Session, habit_id: int, habit: schemas.HabitUpdate):
    db_habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if db_habit:
        for key, value in habit.dict(exclude_unset=True).items():
            setattr(db_habit, key, value)
        db_habit.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_habit)
    return db_habit

def delete_habit(db: Session, habit_id: int):
    db_habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if db_habit:
        db.delete(db_habit)
        db.commit()
    return db_habit

# Completion CRUD
def create_completion(db: Session, habit_id: int, completion_date: Optional[date] = None):
    if completion_date is None:
        completion_date = date.today()

    # Check if already completed today
    existing = db.query(models.Completion).filter(
        models.Completion.habit_id == habit_id,
        models.Completion.completed_date == completion_date
    ).first()

    if existing:
        return existing

    db_completion = models.Completion(
        habit_id=habit_id,
        completed_date=completion_date
    )
    db.add(db_completion)

    # Update streak
    habit = get_habit(db, habit_id)
    if habit:
        update_streak(db, habit)

    db.commit()
    db.refresh(db_completion)
    return db_completion

def get_completions(db: Session, habit_id: int):
    return db.query(models.Completion).filter(
        models.Completion.habit_id == habit_id
    ).order_by(models.Completion.completed_date.desc()).all()

def delete_completion(db: Session, habit_id: int, completion_date: date):
    completion = db.query(models.Completion).filter(
        models.Completion.habit_id == habit_id,
        models.Completion.completed_date == completion_date
    ).first()

    if completion:
        db.delete(completion)

        # Update streak
        habit = get_habit(db, habit_id)
        if habit:
            update_streak(db, habit)

        db.commit()
    return completion

# Streak calculation
def update_streak(db: Session, habit: models.Habit):
    completions = db.query(models.Completion).filter(
        models.Completion.habit_id == habit.id
    ).order_by(models.Completion.completed_date.desc()).all()

    if not completions:
        habit.current_streak = 0
        return

    # Calculate current streak
    current_streak = 0
    today = date.today()
    yesterday = today - timedelta(days=1)

    # Check if completed today or yesterday to maintain streak
    latest_completion = completions[0].completed_date

    if latest_completion == today or latest_completion == yesterday:
        current_streak = 1
        check_date = latest_completion - timedelta(days=1)

        for completion in completions[1:]:
            if completion.completed_date == check_date:
                current_streak += 1
                check_date -= timedelta(days=1)
            else:
                break

    habit.current_streak = current_streak
    if current_streak > habit.best_streak:
        habit.best_streak = current_streak

# Statistics
def get_habit_stats(db: Session, habit_id: int) -> Optional[schemas.HabitStats]:
    habit = get_habit(db, habit_id)
    if not habit:
        return None

    completions = get_completions(db, habit_id)
    total_completions = len(completions)

    # Calculate completion rate (last 30 days)
    thirty_days_ago = date.today() - timedelta(days=30)
    recent_completions = [c for c in completions if c.completed_date >= thirty_days_ago]
    completion_rate = (len(recent_completions) / 30) * 100 if recent_completions else 0

    last_completed = completions[0].completed_date if completions else None

    return schemas.HabitStats(
        habit_id=habit.id,
        title=habit.title,
        total_completions=total_completions,
        current_streak=habit.current_streak,
        best_streak=habit.best_streak,
        completion_rate=round(completion_rate, 2),
        last_completed=last_completed
    )

def get_overall_stats(db: Session) -> schemas.OverallStats:
    total_habits = db.query(models.Habit).count()
    habits = get_habits(db)

    active_streaks = sum(1 for h in habits if h.current_streak > 0)
    total_completions = db.query(models.Completion).count()
    average_streak = sum(h.current_streak for h in habits) / total_habits if total_habits > 0 else 0

    return schemas.OverallStats(
        total_habits=total_habits,
        active_streaks=active_streaks,
        total_completions=total_completions,
        average_streak=round(average_streak, 2)
    )

def get_habit_chain(db: Session, habit_id: int) -> List[models.Habit]:
    """Get the full chain of linked habits starting from the given habit"""
    chain = []
    current_habit = get_habit(db, habit_id)

    while current_habit and current_habit not in chain:
        chain.append(current_habit)
        if current_habit.linked_habit_id:
            current_habit = get_habit(db, current_habit.linked_habit_id)
        else:
            break

    return chain