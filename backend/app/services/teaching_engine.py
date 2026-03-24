from collections.abc import AsyncGenerator

from app.core.ai_client import claude_client


async def stream_teaching_response(
    chapter_content: dict,
    student_message: str,
    conversation_history: list[dict],
    student_grade: str,
    student_background: str | None,
) -> AsyncGenerator[str, None]:
    """Stream a teaching response using Claude API.

    Uses Socratic method — guides rather than gives answers.
    Adapts explanation depth based on student responses.
    """
    # TODO: Implement streaming teaching chat with Claude
    yield ""
