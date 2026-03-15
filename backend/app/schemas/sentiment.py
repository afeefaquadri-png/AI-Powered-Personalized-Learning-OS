from pydantic import BaseModel


class SentimentRequest(BaseModel):
    chapter_id: str
    frame_base64: str


class SentimentResponse(BaseModel):
    emotion: str
    confidence: float
    action_taken: str | None = None
