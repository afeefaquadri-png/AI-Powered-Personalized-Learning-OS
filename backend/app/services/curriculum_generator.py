from app.core.ai_client import claude_client


async def generate_curriculum(
    subject_name: str,
    grade: str,
    background: str | None,
    difficulty_level: str,
) -> dict:
    """Generate a full curriculum for a subject using Claude API.

    Returns a structured curriculum with ordered chapters, descriptions,
    learning objectives, and estimated difficulty.
    """
    # TODO: Implement prompt chain for curriculum generation
    pass


async def generate_chapter_content(
    chapter_title: str,
    chapter_description: str,
    subject_name: str,
    grade: str,
    student_background: str | None,
) -> dict:
    """Generate detailed content for a single chapter.

    Returns content with explanatory text, diagrams (Mermaid.js),
    formulas (LaTeX), key concepts, and summary.
    """
    # TODO: Implement content generation with Claude
    pass
