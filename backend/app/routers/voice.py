import asyncio
import json

import websockets
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from app.config import settings
from app.dependencies import get_current_user
from app.services.voice_manager import create_realtime_session

router = APIRouter()

OPENAI_REALTIME_URL = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview"


@router.post("/session")
async def create_voice_session(user: dict = Depends(get_current_user)):
    """Create an OpenAI Realtime ephemeral session token for client-side use."""
    session = await create_realtime_session()
    return session


@router.websocket("/ws")
async def voice_websocket(websocket: WebSocket):
    """
    WebSocket proxy between the browser client and OpenAI Realtime API.

    The client sends audio chunks and control messages; this endpoint
    forwards them to OpenAI and streams responses back.
    """
    await websocket.accept()

    openai_headers = {
        "Authorization": f"Bearer {settings.openai_api_key}",
        "OpenAI-Beta": "realtime=v1",
    }

    try:
        async with websockets.connect(
            OPENAI_REALTIME_URL, additional_headers=openai_headers
        ) as openai_ws:

            async def receive_from_client():
                """Forward messages from the browser to OpenAI."""
                try:
                    while True:
                        message = await websocket.receive_text()
                        await openai_ws.send(message)
                except WebSocketDisconnect:
                    await openai_ws.close()
                except Exception:
                    await openai_ws.close()

            async def receive_from_openai():
                """Forward messages from OpenAI back to the browser."""
                try:
                    async for message in openai_ws:
                        if isinstance(message, bytes):
                            await websocket.send_bytes(message)
                        else:
                            await websocket.send_text(message)
                except Exception:
                    pass

            # Run both directions concurrently
            await asyncio.gather(
                receive_from_client(),
                receive_from_openai(),
                return_exceptions=True,
            )

    except WebSocketDisconnect:
        pass
    except Exception as e:
        try:
            await websocket.send_text(json.dumps({"error": str(e), "type": "connection_error"}))
        except Exception:
            pass
