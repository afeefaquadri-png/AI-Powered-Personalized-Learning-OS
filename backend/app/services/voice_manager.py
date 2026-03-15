import httpx

from app.config import settings


async def create_realtime_session() -> dict:
    """Create an OpenAI Realtime API session with ephemeral token.

    Configures server VAD for turn detection and
    appropriate silence duration for natural pauses.
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/realtime/sessions",
            headers={
                "Authorization": f"Bearer {settings.openai_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-4o-realtime-preview",
                "voice": "alloy",
                "modalities": ["audio", "text"],
                "turn_detection": {
                    "type": "server_vad",
                    "threshold": 0.5,
                    "silence_duration_ms": 800,
                },
            },
        )
        return response.json()
