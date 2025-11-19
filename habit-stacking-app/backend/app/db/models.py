from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Habit(Base):
    __tablename__ = 'habits'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    trigger = Column(String, nullable=False)  # The existing action that triggers this habit
    frequency = Column(String, default='daily')  # daily, weekly, monthly
    current_streak = Column(Integer, default=0)
    best_streak = Column(Integer, default=0)
    linked_habit_id = Column(Integer, ForeignKey('habits.id'), nullable=True)  # Link to next habit in chain
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    linked_habit = relationship("Habit", remote_side=[id], backref="linked_from", uselist=False)
    completions = relationship("Completion", back_populates="habit", cascade="all, delete-orphan")

class Completion(Base):
    __tablename__ = 'completions'

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey('habits.id'), nullable=False)
    completed_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    habit = relationship("Habit", back_populates="completions")