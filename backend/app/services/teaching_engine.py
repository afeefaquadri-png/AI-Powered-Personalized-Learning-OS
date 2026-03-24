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
    key_concepts = ", ".join(chapter_content.get("key_concepts", []))
    chapter_summary = chapter_content.get("summary", "")
    background_info = f"\nStudent background: {student_background}" if student_background else ""

    system_prompt = f"""You are an expert, patient AI tutor for a grade {student_grade} student.

Teaching philosophy:
- Use the Socratic method: ask guiding questions rather than giving direct answers to homework/activity questions
- Adapt ALL explanations to grade {student_grade} level — use age-appropriate vocabulary
- Use real-world analogies and concrete examples the student can relate to
- Break complex concepts into small, digestible steps
- After each explanation, check for understanding with a brief question
- Be encouraging, warm, and supportive — never condescending
- When a student is confused, try a completely different approach or analogy
- Reference the current lesson content when relevant
- For activity/quiz questions: guide the student to discover the answer — never give it directly{background_info}

Current lesson context:
Chapter: {chapter_content.get("title", "Current Topic")}
Key concepts to master: {key_concepts}
Chapter overview: {chapter_summary}

Formatting rules:
- For diagrams, use Mermaid syntax in a fenced code block: ```mermaid ... ```
- For inline math formulas use: $formula$
- For block math formulas use: $$formula$$
- Use **bold** for key terms and important points
- Keep responses focused and not too long — aim for clarity over comprehensiveness"""

    # Build message history (last 20 exchanges for context)
    messages = []
    for msg in conversation_history[-20:]:
        role = "user" if msg.get("role") in ("student", "user") else "assistant"
        messages.append({"role": role, "content": msg["content"]})

    messages.append({"role": "user", "content": student_message})

    async with claude_client.messages.stream(
        model="claude-opus-4-6",
        max_tokens=2048,
        system=system_prompt,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            yield text
