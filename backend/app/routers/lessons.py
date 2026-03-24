from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db_session
from app.schemas.lesson import ChatRequest

router = APIRouter()


@router.get("/{chapter_id}/content")
async def get_lesson_content(
    chapter_id: str,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Get or generate chapter content (text, diagrams, formulas)."""
    # TODO: Fetch or generate via teaching_engine service
    pass


@router.post("/{chapter_id}/chat")
async def teaching_chat(
    chapter_id: str,
    data: ChatRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Streaming teaching chat via SSE."""
    # TODO: Stream response from Claude teaching engine

    async def event_stream():
        yield "data: {}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
