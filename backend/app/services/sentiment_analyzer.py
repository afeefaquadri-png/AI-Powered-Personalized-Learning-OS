import base64

from app.core.ai_client import claude_client


async def analyze_frame(frame_base64: str) -> dict:
    """Analyze a video frame for student sentiment using Claude Vision.

    Detects: engagement, confusion, boredom, frustration, happiness, drowsiness.
    Returns emotion label and confidence score.
    """
    # TODO: Implement Claude Vision analysis
    pass


def determine_adaptive_action(emotion: str, confidence: float) -> str | None:
    """Determine what adaptive action to take based on detected sentiment."""
    if confidence < 0.6:
        return None

    actions = {
        "bored": "Simplify content and add interactive elements. Consider suggesting a break.",
        "confused": "Slow down and re-explain with different examples and analogies.",
        "frustrated": "Offer encouragement and break the problem into smaller steps.",
        "drowsy": "Suggest a physical activity break or switch to interactive mode.",
    }
    return actions.get(emotion)
