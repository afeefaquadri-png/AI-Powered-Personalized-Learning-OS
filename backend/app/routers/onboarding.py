from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db_session
from app.schemas.onboarding import OnboardingRequest, OnboardingResponse

router = APIRouter()


@router.post("", response_model=OnboardingResponse)
async def save_onboarding(
    data: OnboardingRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Save student profile from onboarding wizard and trigger curriculum generation."""
    # TODO: Save student profile, trigger curriculum generation
    pass


@router.post("/marksheet")
async def upload_marksheet(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """Upload marksheet to Supabase Storage."""
    # TODO: Upload to Supabase Storage, return path
    pass
