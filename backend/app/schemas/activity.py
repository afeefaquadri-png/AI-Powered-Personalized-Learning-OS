from pydantic import BaseModel


class ActivitySubmitRequest(BaseModel):
    responses: dict


class ActivityEvaluationResponse(BaseModel):
    activity_id: str
    score: int
    correctness: dict
    feedback: str
    guidance: str
    question_feedback: list = []
    chapter_references: list = []
    study_plan: list = []
    strengths: list = []
    areas_for_improvement: list = []
