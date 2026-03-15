from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from app.dependencies import get_current_user
from app.schemas.sentiment import SentimentRequest, SentimentResponse

router = APIRouter()


@router.post("/analyze", response_model=SentimentResponse)
async def analyze_frame(
    data: SentimentRequest,
    user: dict = Depends(get_current_user),
):
    """Analyze a video frame for student sentiment via Claude Vision."""
    # TODO: Call sentiment_analyzer service
    pass


@router.websocket("/sentiment/ws")
async def sentiment_websocket(websocket: WebSocket):
    """WebSocket for streaming live sentiment updates."""
    await websocket.accept()
    try:
        while True:
            frame_data = await websocket.receive_text()
            # TODO: Analyze frame, push sentiment result back
            await websocket.send_json({"emotion": "engaged", "confidence": 0.9})
    except WebSocketDisconnect:
        pass
