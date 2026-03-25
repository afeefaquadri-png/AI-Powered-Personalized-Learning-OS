from pydantic import BaseModel


class SentimentRequest(BaseModel):
    chapter_id: str | None = None  # optional — not all sessions are tied to a chapter
    frame_base64: str


class SentimentResponse(BaseModel):
    emotion: str
    confidence: float
    action_taken: str | None = None
