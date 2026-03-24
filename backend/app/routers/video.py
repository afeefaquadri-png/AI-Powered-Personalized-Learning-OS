import json
import uuid

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db_session
from app.dependencies import get_current_user
from app.models.sentiment_log import SentimentLog
from app.schemas.sentiment import SentimentRequest, SentimentResponse
from app.services.sentiment_analyzer import analyze_frame, determine_adaptive_action

router = APIRouter()


@router.post("/analyze", response_model=SentimentResponse)
async def analyze_frame_route(
    data: SentimentRequest,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
):
    """Analyze a video frame for student sentiment via Claude Vision."""
    student_id = uuid.UUID(user["sub"])

    result = await analyze_frame(data.frame_base64)
    emotion = result.get("emotion", "engaged")
    confidence = result.get("confidence", 0.5)
    action = determine_adaptive_action(emotion, confidence)

    # Persist the sentiment log
    log = SentimentLog(
        student_id=student_id,
        chapter_id=uuid.UUID(data.chapter_id),
        emotion=emotion,
        confidence=confidence,
        action_taken=action,
    )
    db.add(log)
    await db.commit()

    return SentimentResponse(
        emotion=emotion,
        confidence=confidence,
        action_taken=action,
    )


@router.websocket("/sentiment/ws")
async def sentiment_websocket(websocket: WebSocket):
    """WebSocket for streaming live sentiment analysis."""
    await websocket.accept()
    try:
        while True:
            raw = await websocket.receive_text()
            data = json.loads(raw)
            frame_base64 = data.get("frame_base64", "")
            chapter_id = data.get("chapter_id", "")

            if not frame_base64:
                await websocket.send_json({"error": "No frame data provided"})
                continue

            try:
                result = await analyze_frame(frame_base64)
                emotion = result.get("emotion", "engaged")
                confidence = result.get("confidence", 0.5)
                action = determine_adaptive_action(emotion, confidence)

                await websocket.send_json(
                    {
                        "emotion": emotion,
                        "confidence": confidence,
                        "action_taken": action,
                        "chapter_id": chapter_id,
                    }
                )
            except Exception as e:
                # Fall back to a neutral response on analysis errors
                await websocket.send_json(
                    {
                        "emotion": "engaged",
                        "confidence": 0.3,
                        "action_taken": None,
                        "error": str(e),
                    }
                )
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
