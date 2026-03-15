from app.core.ai_client import claude_client


async def evaluate_submission(
    activity_prompt: dict,
    student_response: dict,
    student_grade: str,
) -> dict:
    """Evaluate a student's activity submission using Claude.

    Returns correctness assessment, detailed feedback,
    score (0-100), and guidance on what to revisit.
    """
    # TODO: Implement AI evaluation with Claude
    pass
