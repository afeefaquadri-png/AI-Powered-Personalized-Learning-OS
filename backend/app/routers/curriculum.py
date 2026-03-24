from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db_session
from app.schemas.curriculum import CurriculumGenerateRequest, CurriculumResponse

router = APIRouter()


@router.post("/generate", response_model=CurriculumResponse)
async def generate_curriculum(
    data: CurriculumGenerateRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Generate a full curriculum for a subject using Claude API."""
    # TODO: Call curriculum_generator service
    pass


@router.get("/{subject_id}", response_model=CurriculumResponse)
async def get_curriculum(
    subject_id: str,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Get existing curriculum (chapters list) for a subject."""
    # TODO: Fetch from DB
    pass
