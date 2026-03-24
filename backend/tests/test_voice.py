"""Tests for voice manager service."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest


# ---------------------------------------------------------------------------
# create_realtime_session
# ---------------------------------------------------------------------------

async def test_create_realtime_session_calls_openai_endpoint():
    """Sends a POST request to the OpenAI Realtime sessions endpoint."""
    from app.services.voice_manager import create_realtime_session

    mock_response = MagicMock()
    mock_response.json.return_value = {
        "id": "sess_test123",
        "client_secret": {"value": "ek_test_secret"},
    }

    mock_client = MagicMock()
    mock_client.__aenter__ = AsyncMock(return_value=mock_client)
    mock_client.__aexit__ = AsyncMock(return_value=False)
    mock_client.post = AsyncMock(return_value=mock_response)

    with patch("app.services.voice_manager.httpx.AsyncClient", return_value=mock_client):
        result = await create_realtime_session()

    mock_client.post.assert_called_once()
    call_args = mock_client.post.call_args
    url = call_args.args[0] if call_args.args else call_args.kwargs.get("url", "")
    assert "realtime/sessions" in url


async def test_create_realtime_session_returns_response_json():
    """Returns the parsed JSON from the OpenAI response."""
    from app.services.voice_manager import create_realtime_session

    expected = {
        "id": "sess_abc",
        "client_secret": {"value": "ek_ephemeral_token"},
    }

    mock_response = MagicMock()
    mock_response.json.return_value = expected

    mock_client = MagicMock()
    mock_client.__aenter__ = AsyncMock(return_value=mock_client)
    mock_client.__aexit__ = AsyncMock(return_value=False)
    mock_client.post = AsyncMock(return_value=mock_response)

    with patch("app.services.voice_manager.httpx.AsyncClient", return_value=mock_client):
        result = await create_realtime_session()

    assert result == expected
    assert result["id"] == "sess_abc"


async def test_create_realtime_session_includes_vad_config():
    """Request body includes server_vad turn detection configuration."""
    from app.services.voice_manager import create_realtime_session

    mock_response = MagicMock()
    mock_response.json.return_value = {"id": "sess_vad_test"}

    mock_client = MagicMock()
    mock_client.__aenter__ = AsyncMock(return_value=mock_client)
    mock_client.__aexit__ = AsyncMock(return_value=False)
    mock_client.post = AsyncMock(return_value=mock_response)

    with patch("app.services.voice_manager.httpx.AsyncClient", return_value=mock_client):
        await create_realtime_session()

    call_kwargs = mock_client.post.call_args.kwargs
    body = call_kwargs.get("json", {})

    assert "turn_detection" in body
    assert body["turn_detection"]["type"] == "server_vad"
    assert body["model"] == "gpt-4o-realtime-preview"
