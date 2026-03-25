import uuid

from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.core.rate_limiter import limiter
from app.dependencies import get_current_user
from app.models.sentiment_log import SentimentLog
from app.schemas.sentiment import SentimentRequest, SentimentResponse
from app.services.sentiment_analyzer import analyze_frame, determine_adaptive_action

router = APIRouter()


@router.post("/analyze", response_model=SentimentResponse)
@limiter.limit("60/minute")
async def analyze_frame_route(
    request: Request,
    data: SentimentRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Analyze a video frame for student sentiment via Claude Vision and persist the result."""
    student_id = uuid.UUID(user["sub"])

    result = await analyze_frame(data.frame_base64)
    emotion = result.get("emotion", "engaged")
    confidence = result.get("confidence", 0.5)
    action = determine_adaptive_action(emotion, confidence)

    # Only persist when a valid chapter_id UUID is provided
    chapter_uuid: uuid.UUID | None = None
    if data.chapter_id:
        try:
            chapter_uuid = uuid.UUID(data.chapter_id)
        except ValueError:
            pass

    if chapter_uuid:
        log = SentimentLog(
            student_id=student_id,
            chapter_id=chapter_uuid,
            emotion=emotion,
            confidence=confidence,
            action_taken=action,
        )
        db.add(log)
        await db.commit()

    return SentimentResponse(emotion=emotion, confidence=confidence, action_taken=action)


@router.get("/sentiment/history")
async def get_sentiment_history(
    response: Response,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
    limit: int = 100,
):
    """Return the student's recent sentiment log entries."""
    student_id = uuid.UUID(user["sub"])

    result = await db.execute(
        select(SentimentLog)
        .where(SentimentLog.student_id == student_id)
        .order_by(SentimentLog.timestamp.desc())
        .limit(limit)
    )
    logs = result.scalars().all()
    response.headers["Cache-Control"] = "private, max-age=30"

    return [
        {
            "emotion": log.emotion,
            "confidence": log.confidence,
            "action_taken": log.action_taken,
            "timestamp": log.timestamp.isoformat(),
            "chapter_id": str(log.chapter_id) if log.chapter_id else None,
        }
        for log in logs
    ]
