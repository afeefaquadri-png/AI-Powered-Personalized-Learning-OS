import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SyllabusBoard(Base):
    """Master board+grade reference entry (e.g., CBSE Grade 10)."""
    __tablename__ = "syllabus_boards"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    board_name: Mapped[str] = mapped_column(String(100), nullable=False)
    grade: Mapped[str] = mapped_column(String(20), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    subjects: Mapped[List["SyllabusSubject"]] = relationship("SyllabusSubject", back_populates="board", cascade="all, delete-orphan")


class SyllabusSubject(Base):
    """A subject within a board+grade (e.g., Mathematics in CBSE Grade 10)."""
    __tablename__ = "syllabus_subjects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    board_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("syllabus_boards.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0)
    is_core: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    board: Mapped["SyllabusBoard"] = relationship("SyllabusBoard", back_populates="subjects")
    chapters: Mapped[List["SyllabusChapter"]] = relationship("SyllabusChapter", back_populates="subject", cascade="all, delete-orphan")


class SyllabusChapter(Base):
    """A chapter/unit within a syllabus subject."""
    __tablename__ = "syllabus_chapters"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("syllabus_subjects.id", ondelete="CASCADE"))
    order_index: Mapped[int] = mapped_column(Integer, default=0)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    key_topics: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    learning_objectives: Mapped[Optional[List[str]]] = mapped_column(ARRAY(Text), nullable=True)
    estimated_hours: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    subject: Mapped["SyllabusSubject"] = relationship("SyllabusSubject", back_populates="chapters")
