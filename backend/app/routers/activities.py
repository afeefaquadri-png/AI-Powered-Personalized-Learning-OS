from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db_session
from app.schemas.activity import ActivitySubmitRequest, ActivityEvaluationResponse

router = APIRouter()


@router.post("/{activity_id}/submit")
async def submit_activity(
    activity_id: str,
    data: ActivitySubmitRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Submit student response for an activity."""
    # TODO: Save submission to DB
    pass


@router.post("/{activity_id}/evaluate", response_model=ActivityEvaluationResponse)
async def evaluate_activity(
    activity_id: str,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """AI-evaluate a submitted activity using Claude."""
    # TODO: Call activity_evaluator service
    pass
