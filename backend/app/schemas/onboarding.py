from pydantic import BaseModel


class OnboardingRequest(BaseModel):
    name: str
    grade: str
    background: str | None = None
    interests: list[str]
    learning_goals: str | None = None


class OnboardingResponse(BaseModel):
    student_id: str
    onboarding_completed: bool
    subjects_created: list[str]
