from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db_session
from app.schemas.progress import ProgressResponse

router = APIRouter()


@router.get("/{student_id}", response_model=ProgressResponse)
async def get_progress(
    student_id: str,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Get student progress and analytics."""
    # TODO: Aggregate progress from DB
    pass
