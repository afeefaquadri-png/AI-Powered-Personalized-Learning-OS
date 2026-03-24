"""Tests for curriculum generation service."""

import json
from unittest.mock import AsyncMock, patch

import pytest


# ---------------------------------------------------------------------------
# generate_curriculum
# ---------------------------------------------------------------------------

async def test_generate_curriculum_calls_claude_when_no_board(
    mock_claude_client, mock_claude_message_factory
):
    """Falls back to Claude when board is None."""
    from app.services.curriculum_generator import generate_curriculum

    chapters_payload = {
        "chapters": [
            {
                "order_index": 1,
                "title": "Introduction to Forces",
                "description": "Overview of forces.",
                "learning_objectives": ["Define force", "Apply Newton's laws"],
                "estimated_difficulty": "beginner",
            }
        ]
    }
    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(json.dumps(chapters_payload))
    )

    result = await generate_curriculum(
        subject_name="Physics",
        grade="10",
        board=None,
        background="Loves experiments",
        difficulty_level="beginner",
    )

    assert "chapters" in result
    assert result["source"] == "ai_generated"
    assert len(result["chapters"]) == 1
    assert result["chapters"][0]["title"] == "Introduction to Forces"
    mock_claude_client.messages.create.assert_called_once()


async def test_generate_curriculum_uses_official_syllabus_when_available(
    mock_claude_client,
):
    """Returns official syllabus chapters and skips Claude when board matches."""
    from app.services.curriculum_generator import generate_curriculum

    fake_syllabus = [
        {
            "order_index": 1,
            "title": "Real Syllabus Chapter 1",
            "description": "Official chapter.",
            "learning_objectives": ["obj1"],
            "estimated_difficulty": "beginner",
        }
    ]

    with patch("app.services.curriculum_generator.get_syllabus", return_value=fake_syllabus):
        result = await generate_curriculum(
            subject_name="Mathematics",
            grade="6",
            board="CBSE",
            background=None,
            difficulty_level="beginner",
        )

    assert result["source"] == "official_syllabus"
    assert result["chapters"][0]["title"] == "Real Syllabus Chapter 1"
    # Claude must NOT be called when official syllabus is used
    mock_claude_client.messages.create.assert_not_called()


async def test_generate_curriculum_falls_back_when_syllabus_returns_none(
    mock_claude_client, mock_claude_message_factory
):
    """Falls back to Claude when get_syllabus returns None (unknown board/subject combo)."""
    from app.services.curriculum_generator import generate_curriculum

    chapters_payload = {"chapters": []}
    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(json.dumps(chapters_payload))
    )

    with patch("app.services.curriculum_generator.get_syllabus", return_value=None):
        result = await generate_curriculum(
            subject_name="Unknown Subject",
            grade="7",
            board="CBSE",
            background=None,
            difficulty_level="intermediate",
        )

    assert result["source"] == "ai_generated"
    mock_claude_client.messages.create.assert_called_once()


# ---------------------------------------------------------------------------
# generate_chapter_content
# ---------------------------------------------------------------------------

async def test_generate_chapter_content_returns_expected_keys(
    mock_claude_client, mock_claude_message_factory, sample_chapter_content
):
    """Chapter content response has all required keys with correct types."""
    from app.services.curriculum_generator import generate_chapter_content

    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(json.dumps(sample_chapter_content))
    )

    result = await generate_chapter_content(
        chapter_title="Newton's Laws of Motion",
        chapter_description="Understanding the three fundamental laws of motion",
        subject_name="Physics",
        grade="10",
        student_background="Interested in science",
    )

    assert "content_html" in result
    assert "diagrams" in result
    assert "formulas" in result
    assert "key_concepts" in result
    assert "summary" in result
    assert isinstance(result["diagrams"], list)
    assert isinstance(result["formulas"], list)
    assert isinstance(result["key_concepts"], list)
    assert isinstance(result["summary"], str)


async def test_generate_chapter_content_propagates_json_error(mock_claude_client, mock_claude_message_factory):
    """Raises json.JSONDecodeError when Claude returns non-JSON."""
    import json as json_module

    from app.services.curriculum_generator import generate_chapter_content

    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory("This is not JSON at all.")
    )

    with pytest.raises(json_module.JSONDecodeError):
        await generate_chapter_content(
            chapter_title="Bad Chapter",
            chapter_description="Will fail.",
            subject_name="Math",
            grade="9",
            student_background=None,
        )


# ---------------------------------------------------------------------------
# generate_activities
# ---------------------------------------------------------------------------

async def test_generate_activities_returns_questions(
    mock_claude_client, mock_claude_message_factory, sample_chapter_content
):
    """Generated activity has 'questions' list with required fields."""
    from app.services.curriculum_generator import generate_activities

    activity_payload = {
        "type": "quiz",
        "title": "Chapter Assessment",
        "instructions": "Answer all questions.",
        "questions": [
            {
                "id": "q1",
                "type": "multiple_choice",
                "question": "What is F=ma?",
                "options": ["A) Newton's 2nd", "B) Newton's 1st"],
                "correct_answer": "A",
                "explanation": "Correct.",
            }
        ],
    }
    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(json.dumps(activity_payload))
    )

    result = await generate_activities(
        chapter_title="Newton's Laws",
        chapter_content=sample_chapter_content,
        subject_name="Physics",
        grade="10",
    )

    assert "questions" in result
    assert len(result["questions"]) >= 1
    q = result["questions"][0]
    assert "id" in q
    assert "type" in q
    assert "question" in q
