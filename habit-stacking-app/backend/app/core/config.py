from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./habits.db"
    API_V1_STR: str = "/api/v1"
    ALLOW_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "*"]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()