"""add board column to students

Revision ID: 0002
Revises: 0001
Create Date: 2026-03-24

"""
from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("students", sa.Column("board", sa.String(50), nullable=True))


def downgrade() -> None:
    op.drop_column("students", "board")
