from sqlalchemy.orm import Session
from app.db.models import Habit
from app.api.v1.schemas import HabitCreate, HabitUpdate

class HabitService:
    def __init__(self, db: Session):
        self.db = db

    def create_habit(self, habit: HabitCreate) -> Habit:
        db_habit = Habit(**habit.dict())
        self.db.add(db_habit)
        self.db.commit()
        self.db.refresh(db_habit)
        return db_habit

    def get_habit(self, habit_id: int) -> Habit:
        return self.db.query(Habit).filter(Habit.id == habit_id).first()

    def update_habit(self, habit_id: int, habit: HabitUpdate) -> Habit:
        db_habit = self.get_habit(habit_id)
        if db_habit:
            for key, value in habit.dict(exclude_unset=True).items():
                setattr(db_habit, key, value)
            self.db.commit()
            self.db.refresh(db_habit)
        return db_habit

    def delete_habit(self, habit_id: int) -> bool:
        db_habit = self.get_habit(habit_id)
        if db_habit:
            self.db.delete(db_habit)
            self.db.commit()
            return True
        return False

    def get_all_habits(self) -> list[Habit]:
        return self.db.query(Habit).all()