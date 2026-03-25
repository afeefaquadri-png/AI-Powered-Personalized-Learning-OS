"""add syllabus reference tables for all boards

Revision ID: 0003
Revises: 0002
Create Date: 2026-03-26

Creates board-level syllabus reference tables that store the official
curriculum structure for CBSE, ICSE, Cambridge IGCSE, IB, and Common Core.
These are used as templates when generating personalised student curricula.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, ARRAY

revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Master board-grade entry
    op.create_table(
        "syllabus_boards",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("board_name", sa.String(100), nullable=False),
        sa.Column("grade", sa.String(20), nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("board_name", "grade", name="uq_board_grade"),
    )

    # Subjects within a board+grade
    op.create_table(
        "syllabus_subjects",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("board_id", UUID(as_uuid=True), sa.ForeignKey("syllabus_boards.id", ondelete="CASCADE"), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("order_index", sa.Integer, nullable=False, default=0),
        sa.Column("is_core", sa.Boolean, nullable=False, default=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_syllabus_subjects_board_id", "syllabus_subjects", ["board_id"])

    # Chapters/units within a subject
    op.create_table(
        "syllabus_chapters",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("subject_id", UUID(as_uuid=True), sa.ForeignKey("syllabus_subjects.id", ondelete="CASCADE"), nullable=False),
        sa.Column("order_index", sa.Integer, nullable=False, default=0),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("key_topics", ARRAY(sa.Text), nullable=True),
        sa.Column("learning_objectives", ARRAY(sa.Text), nullable=True),
        sa.Column("estimated_hours", sa.Integer, nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_syllabus_chapters_subject_id", "syllabus_chapters", ["subject_id"])


def downgrade() -> None:
    op.drop_table("syllabus_chapters")
    op.drop_table("syllabus_subjects")
    op.drop_table("syllabus_boards")
