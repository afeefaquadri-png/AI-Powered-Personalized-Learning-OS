import json

from app.core.ai_client import claude_client


async def analyze_frame(frame_base64: str) -> dict:
    """Analyze a video frame for student sentiment using Claude Vision.

    Detects: engagement, confusion, boredom, frustration, happiness, drowsiness.
    Returns emotion label and confidence score.
    """
    prompt = """Analyze this image of a student at their computer/desk and determine their current emotional/engagement state.

Look for visual cues:
- Facial expression (smile, frown, neutral, yawning, squinting)
- Eye state (wide open and focused, glazed/unfocused, half-closed, closed)
- Posture (upright and leaning in = engaged; slouched, head drooping = bored/drowsy)
- Brow (furrowed = confused/frustrated; relaxed = engaged/happy)
- Overall body language and energy level

Return ONLY valid JSON (no markdown):
{
  "emotion": "engaged",
  "confidence": 0.85,
  "notes": "Student appears focused with direct eye contact at screen"
}

The "emotion" field MUST be exactly one of these values:
- "engaged" — actively focused and interested
- "confused" — furrowed brow, tilted head, uncertain expression
- "bored" — flat expression, looking away, slouched
- "frustrated" — visible tension, frown, possibly hand on face
- "happy" — smiling, energetic, positive body language
- "drowsy" — drooping eyes, slouched, slow movements, yawning

The "confidence" must be a float between 0.0 and 1.0.
If image quality is poor or face is not visible, return confidence below 0.4."""

    message = await claude_client.messages.create(
        model="claude-opus-4-6",
        max_tokens=256,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": frame_base64,
                        },
                    },
                    {
                        "type": "text",
                        "text": prompt,
                    },
                ],
            }
        ],
    )

    content = message.content[0].text
    start = content.find("{")
    end = content.rfind("}") + 1
    json_str = content[start:end]
    return json.loads(json_str)


def determine_adaptive_action(emotion: str, confidence: float) -> str | None:
    """Determine what adaptive action to take based on detected sentiment."""
    if confidence < 0.6:
        return None

    actions = {
        "bored": "Switching to a more interactive format. Try exploring the diagrams or asking a question about what interests you most!",
        "confused": "Let's slow down and approach this differently. Ask me to explain any concept in a new way!",
        "frustrated": "Take a breath — you're doing great! Let's break this down into smaller, simpler steps.",
        "drowsy": "Time for a quick 2-minute break! Stand up, stretch, and come back refreshed.",
        "engaged": None,
        "happy": None,
    }
    return actions.get(emotion)
