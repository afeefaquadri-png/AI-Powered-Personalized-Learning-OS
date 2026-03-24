"""Tests for teaching engine service."""

from unittest.mock import AsyncMock, MagicMock

import pytest


async def _collect_stream(generator) -> str:
    """Helper: collect all chunks from an async generator into a string."""
    parts = []
    async for chunk in generator:
        parts.append(chunk)
    return "".join(parts)


async def _async_text_generator(chunks):
    for chunk in chunks:
        yield chunk


def _make_stream_ctx(chunks: list[str]):
    """Build a mock async context manager that streams the given text chunks."""
    ctx = MagicMock()
    ctx.__aenter__ = AsyncMock(return_value=ctx)
    ctx.__aexit__ = AsyncMock(return_value=False)
    ctx.text_stream = _async_text_generator(chunks)
    return ctx


# ---------------------------------------------------------------------------
# stream_teaching_response
# ---------------------------------------------------------------------------

async def test_stream_teaching_response_yields_text(mock_claude_client, sample_chapter_content):
    """All text chunks from Claude's stream are yielded in order."""
    from app.services.teaching_engine import stream_teaching_response

    expected_chunks = ["Newton's ", "first ", "law states ", "inertia."]
    mock_claude_client.messages.stream = MagicMock(
        return_value=_make_stream_ctx(expected_chunks)
    )

    result = await _collect_stream(
        stream_teaching_response(
            chapter_content=sample_chapter_content,
            student_message="Can you explain Newton's first law?",
            conversation_history=[],
            student_grade="10",
            student_background=None,
        )
    )

    assert result == "Newton's first law states inertia."


async def test_stream_teaching_response_uses_last_20_messages(
    mock_claude_client, sample_chapter_content
):
    """Only the last 20 messages from conversation_history are sent to Claude."""
    from app.services.teaching_engine import stream_teaching_response

    mock_claude_client.messages.stream = MagicMock(
        return_value=_make_stream_ctx(["OK"])
    )

    # Build 25 history messages
    history = [
        {"role": "student" if i % 2 == 0 else "tutor", "content": f"Message {i}"}
        for i in range(25)
    ]

    await _collect_stream(
        stream_teaching_response(
            chapter_content=sample_chapter_content,
            student_message="New question",
            conversation_history=history,
            student_grade="9",
            student_background=None,
        )
    )

    call_kwargs = mock_claude_client.messages.stream.call_args.kwargs
    # The last message is the new student message, so history contributes at most 20
    sent_messages = call_kwargs["messages"]
    # Total = up to 20 history + 1 new student message
    assert len(sent_messages) <= 21


async def test_stream_teaching_response_system_prompt_contains_grade(
    mock_claude_client, sample_chapter_content
):
    """The system prompt references the student's grade."""
    from app.services.teaching_engine import stream_teaching_response

    mock_claude_client.messages.stream = MagicMock(
        return_value=_make_stream_ctx(["Fine."])
    )

    await _collect_stream(
        stream_teaching_response(
            chapter_content=sample_chapter_content,
            student_message="Hello",
            conversation_history=[],
            student_grade="7",
            student_background=None,
        )
    )

    call_kwargs = mock_claude_client.messages.stream.call_args.kwargs
    system_prompt = call_kwargs["system"]
    assert "7" in system_prompt


async def test_stream_teaching_response_maps_student_role_to_user(
    mock_claude_client, sample_chapter_content
):
    """History messages with role='student' are mapped to role='user' for Claude."""
    from app.services.teaching_engine import stream_teaching_response

    mock_claude_client.messages.stream = MagicMock(
        return_value=_make_stream_ctx(["Sure!"])
    )

    history = [
        {"role": "student", "content": "What is inertia?"},
        {"role": "tutor", "content": "Inertia is the tendency to resist change."},
    ]

    await _collect_stream(
        stream_teaching_response(
            chapter_content=sample_chapter_content,
            student_message="Give me an example.",
            conversation_history=history,
            student_grade="8",
            student_background="Likes sports",
        )
    )

    call_kwargs = mock_claude_client.messages.stream.call_args.kwargs
    sent_messages = call_kwargs["messages"]
    # First history message was role='student' — must be sent as role='user'
    assert sent_messages[0]["role"] == "user"
    # Second history message was role='tutor' — must be sent as role='assistant'
    assert sent_messages[1]["role"] == "assistant"
