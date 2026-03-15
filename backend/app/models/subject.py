import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("students.id"))
    name: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(Enum("not_started", "in_progress", "completed", name="subject_status"), default="not_started")
    difficulty_level: Mapped[str] = mapped_column(Enum("beginner", "intermediate", "advanced", name="difficulty_level"), default="beginner")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="subjects")
    chapters = relationship("Chapter", back_populates="subject")
