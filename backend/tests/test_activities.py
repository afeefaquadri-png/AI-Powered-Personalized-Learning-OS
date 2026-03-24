"""Tests for activity evaluator service."""

import json
from unittest.mock import AsyncMock

import pytest


# ---------------------------------------------------------------------------
# evaluate_submission
# ---------------------------------------------------------------------------

async def test_evaluate_submission_returns_expected_keys(
    mock_claude_client,
    mock_claude_message_factory,
    sample_activity_prompt,
    sample_student_responses,
):
    """Evaluation result contains all required keys with correct types."""
    from app.services.activity_evaluator import evaluate_submission

    evaluation_payload = {
        "score": 85,
        "correctness": {
            "overall": "good",
            "details": {"q1": "correct", "q2": "partial"},
        },
        "feedback": "Well done! You understood the main concepts.",
        "guidance": "Review momentum and apply it to real-world examples.",
        "strengths": ["Strong understanding of Newton's second law"],
        "areas_for_improvement": ["Needs more detail on Newton's first law"],
    }
    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(json.dumps(evaluation_payload))
    )

    result = await evaluate_submission(
        activity_prompt=sample_activity_prompt,
        student_response=sample_student_responses,
        student_grade="10",
    )

    assert "score" in result
    assert "correctness" in result
    assert "feedback" in result
    assert "guidance" in result
    assert "strengths" in result
    assert "areas_for_improvement" in result
    assert isinstance(result["score"], int)
    assert 0 <= result["score"] <= 100


async def test_evaluate_submission_score_is_integer(
    mock_claude_client,
    mock_claude_message_factory,
    sample_activity_prompt,
    sample_student_responses,
):
    """Score returned as integer in range 0-100."""
    from app.services.activity_evaluator import evaluate_submission

    for score_value in [0, 50, 100]:
        mock_claude_client.messages.create = AsyncMock(
            return_value=mock_claude_message_factory(
                json.dumps({
                    "score": score_value,
                    "correctness": {"overall": "tested", "details": {}},
                    "feedback": "ok",
                    "guidance": "ok",
                    "strengths": [],
                    "areas_for_improvement": [],
                })
            )
        )
        result = await evaluate_submission(
            activity_prompt=sample_activity_prompt,
            student_response=sample_student_responses,
            student_grade="8",
        )
        assert result["score"] == score_value


async def test_evaluate_submission_invalid_json_raises(
    mock_claude_client,
    mock_claude_message_factory,
    sample_activity_prompt,
    sample_student_responses,
):
    """Raises json.JSONDecodeError when Claude returns non-JSON text."""
    import json as json_module

    from app.services.activity_evaluator import evaluate_submission

    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory("Sorry, I cannot evaluate that.")
    )

    with pytest.raises(json_module.JSONDecodeError):
        await evaluate_submission(
            activity_prompt=sample_activity_prompt,
            student_response=sample_student_responses,
            student_grade="10",
        )


async def test_evaluate_submission_passes_grade_to_prompt(
    mock_claude_client,
    mock_claude_message_factory,
    sample_activity_prompt,
    sample_student_responses,
):
    """The student's grade appears in the prompt sent to Claude."""
    from app.services.activity_evaluator import evaluate_submission

    mock_claude_client.messages.create = AsyncMock(
        return_value=mock_claude_message_factory(
            json.dumps({
                "score": 70,
                "correctness": {"overall": "good", "details": {}},
                "feedback": "ok",
                "guidance": "ok",
                "strengths": [],
                "areas_for_improvement": [],
            })
        )
    )

    await evaluate_submission(
        activity_prompt=sample_activity_prompt,
        student_response=sample_student_responses,
        student_grade="11",
    )

    call_args = mock_claude_client.messages.create.call_args
    messages = call_args.kwargs.get("messages") or call_args.args[0] if call_args.args else call_args.kwargs["messages"]
    prompt_text = messages[0]["content"]
    assert "11" in prompt_text
