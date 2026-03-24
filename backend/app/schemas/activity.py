from pydantic import BaseModel


class ActivitySubmitRequest(BaseModel):
    responses: dict


class ActivityEvaluationResponse(BaseModel):
    activity_id: str
    score: int
    correctness: dict
    feedback: str
    guidance: str
