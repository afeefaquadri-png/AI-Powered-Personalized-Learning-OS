from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()


@router.websocket("/ws")
async def voice_websocket(websocket: WebSocket):
    """WebSocket endpoint for OpenAI Realtime voice session."""
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_bytes()
            # TODO: Forward audio to OpenAI Realtime API, return responses
            await websocket.send_bytes(data)
    except WebSocketDisconnect:
        pass
