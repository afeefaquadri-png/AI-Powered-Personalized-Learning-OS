import json

from openai import AsyncOpenAI

from app.core.ai_client import claude_client

_openai_client = AsyncOpenAI()


async def evaluate_submission(
    activity_prompt: dict,
    student_response: dict,
    student_grade: str,
) -> dict:
    """Evaluate a student's activity submission using Claude.

    Returns correctness assessment, detailed feedback,
    score (0-100), and guidance on what to revisit.
    """
    prompt = f"""You are an expert K-12 evaluator. Carefully evaluate this student's activity submission.

Grade level: {student_grade}
Activity type: {activity_prompt.get("type", "general")}

Activity / Questions:
{json.dumps(activity_prompt, indent=2)}

Student's Response:
{json.dumps(student_response, indent=2)}

Evaluate the submission thoroughly and return ONLY valid JSON (no markdown, no explanation):
{{
  "score": 85,
  "correctness": {{
    "overall": "partial",
    "details": {{
      "q1": "correct",
      "q2": "incorrect - student confused X with Y",
      "q3": "partial - correct approach but arithmetic error"
    }}
  }},
  "feedback": "Detailed, encouraging 3-4 sentence feedback. Acknowledge what the student did well first, then address areas for improvement. Be specific about which concepts need review. Use grade-appropriate language.",
  "guidance": "2-3 specific sentences guiding what to revisit. Reference the lesson material or key concepts. Suggest a specific way to practice or remember the concept.",
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "areas_for_improvement": ["Specific area 1", "Specific area 2"]
}}

Scoring guide:
- 90-100: Excellent — all or nearly all correct, strong understanding demonstrated
- 70-89: Good — mostly correct with minor errors or gaps
- 50-69: Partial — some correct answers but significant conceptual gaps
- 30-49: Needs improvement — fundamental misunderstandings present
- 0-29: Requires re-study — major gaps, recommend reviewing the lesson

IMPORTANT: Be encouraging regardless of the score. Frame feedback positively and constructively."""

    content = ""
    try:
        message = await claude_client.messages.create(
            model="claude-opus-4-6",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        content = message.content[0].text
    except Exception:
        # Fallback to GPT-4o if Claude is unavailable or overloaded
        response = await _openai_client.chat.completions.create(
            model="gpt-4o",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        content = response.choices[0].message.content or ""

    start = content.find("{")
    end = content.rfind("}") + 1
    json_str = content[start:end]
    return json.loads(json_str)
