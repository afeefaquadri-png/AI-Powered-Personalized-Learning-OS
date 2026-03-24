import json

from app.core.ai_client import claude_client
from app.services.syllabus_data import get_syllabus


async def generate_curriculum(
    subject_name: str,
    grade: str,
    board: str | None,
    background: str | None,
    difficulty_level: str,
) -> dict:
    """Return curriculum chapters.

    If a matching board+subject+grade exists in the official syllabus data,
    those hardcoded chapters are used directly (AI only fills descriptions).
    Otherwise falls back to Claude-generated chapter list.
    """
    chapters = []

    syllabus = get_syllabus(board, subject_name, grade) if board else None

    if syllabus:
        # Use official chapter list — chapters are dicts (TypedDict)
        for ch in syllabus:
            chapters.append(
                {
                    "order_index": ch["order_index"],
                    "title": ch["title"],
                    "description": ch["description"],
                    "learning_objectives": ch.get("learning_objectives", []),
                    "estimated_difficulty": ch.get("estimated_difficulty") or difficulty_level,
                }
            )
        return {"chapters": chapters, "board": board, "source": "official_syllabus"}

    # Fallback: ask Claude to generate chapter list
    background_info = f"\nStudent background: {background}" if background else ""
    board_info = f"\nBoard / curriculum framework: {board}" if board else ""

    prompt = f"""You are an expert K-12 curriculum designer. Create a comprehensive, well-structured curriculum for:

Subject: {subject_name}
Grade Level: {grade}
Difficulty: {difficulty_level}{board_info}{background_info}

Generate a curriculum with 8-12 chapters that builds progressively. Each chapter should:
- Have a clear, engaging title
- Include a 2-3 sentence description
- List 3-5 specific learning objectives
- Be appropriate for grade {grade} students

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{{
  "chapters": [
    {{
      "order_index": 1,
      "title": "Chapter Title",
      "description": "2-3 sentence description of what students will learn",
      "learning_objectives": ["objective 1", "objective 2", "objective 3"],
      "estimated_difficulty": "beginner"
    }}
  ]
}}"""

    message = await claude_client.messages.create(
        model="claude-opus-4-6",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text
    start = content.find("{")
    end = content.rfind("}") + 1
    json_str = content[start:end]
    data = json.loads(json_str)
    data["board"] = board
    data["source"] = "ai_generated"
    return data


async def generate_chapter_content(
    chapter_title: str,
    chapter_description: str,
    subject_name: str,
    grade: str,
    student_background: str | None,
    board: str | None = None,
) -> dict:
    """Generate detailed content for a single chapter.

    Returns content with explanatory text, diagrams (Mermaid.js),
    formulas (LaTeX), key concepts, and summary.
    """
    background_info = f"\nStudent background: {student_background}" if student_background else ""
    board_info = f"\nBoard / curriculum framework: {board}" if board else ""

    prompt = f"""You are an expert K-12 educator. Generate comprehensive, engaging lesson content for:

Subject: {subject_name}
Grade: {grade}
Chapter: {chapter_title}
Description: {chapter_description}{board_info}{background_info}

Create detailed, accurate educational content appropriate for grade {grade} students.

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{{
  "content_html": "<h2>Introduction</h2><p>Full HTML lesson content with headings, paragraphs, bullet lists, real-world examples, step-by-step explanations...</p>",
  "diagrams": [
    "graph TD\\n    A[Concept A] --> B[Sub-concept B]\\n    B --> C[Result C]"
  ],
  "formulas": [
    "F = ma",
    "v = u + at"
  ],
  "key_concepts": [
    "Key concept 1: brief definition",
    "Key concept 2: brief definition"
  ],
  "summary": "A comprehensive 2-3 paragraph summary of the chapter covering all main points."
}}

Guidelines:
- content_html: Rich HTML with h2/h3 headings, paragraphs, ul/ol lists, bold key terms. Make it engaging and thorough (600-900 words). Use real-world examples and analogies.
- diagrams: Mermaid.js syntax ONLY. Include 1-3 relevant diagrams if they add value. Use empty array [] if diagrams don't apply.
- formulas: LaTeX math notation. Include relevant equations. Use empty array [] if no formulas apply.
- key_concepts: 4-6 key concepts students MUST understand to master this chapter.
- summary: Concise but complete recap of the chapter."""

    message = await claude_client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8192,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text
    start = content.find("{")
    end = content.rfind("}") + 1
    json_str = content[start:end]
    return json.loads(json_str)


async def generate_activities(
    chapter_title: str,
    chapter_content: dict,
    subject_name: str,
    grade: str,
) -> dict:
    """Generate activities for a chapter after the lesson content.

    Returns a set of activities including quiz, problem set, etc.
    """
    key_concepts = chapter_content.get("key_concepts", [])
    summary = chapter_content.get("summary", "")

    prompt = f"""You are an expert K-12 educator. Generate a set of activities to assess student understanding of:

Subject: {subject_name}
Grade: {grade}
Chapter: {chapter_title}
Key Concepts: {", ".join(key_concepts)}
Chapter Summary: {summary}

Create a varied activity set that tests different levels of understanding.

Return ONLY valid JSON in this exact format (no markdown):
{{
  "type": "quiz",
  "title": "Chapter Assessment: {chapter_title}",
  "instructions": "Answer the following questions to the best of your ability.",
  "questions": [
    {{
      "id": "q1",
      "type": "multiple_choice",
      "question": "Question text here?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correct_answer": "A",
      "explanation": "Why A is correct"
    }},
    {{
      "id": "q2",
      "type": "short_answer",
      "question": "Explain in your own words...",
      "expected_concepts": ["concept 1", "concept 2"]
    }},
    {{
      "id": "q3",
      "type": "problem",
      "question": "Solve this problem step by step...",
      "hint": "Think about the formula...",
      "expected_concepts": ["formula", "calculation"]
    }}
  ]
}}

Include 4-6 questions mixing multiple choice, short answer, and problem-solving types."""

    message = await claude_client.messages.create(
        model="claude-opus-4-6",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}],
    )

    content = message.content[0].text
    start = content.find("{")
    end = content.rfind("}") + 1
    json_str = content[start:end]
    return json.loads(json_str)
