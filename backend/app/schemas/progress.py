from pydantic import BaseModel


class SubjectProgress(BaseModel):
    subject_id: str
    subject_name: str
    chapters_completed: int
    total_chapters: int
    average_score: float | None = None
    strengths: list[str] = []
    weaknesses: list[str] = []


class ProgressResponse(BaseModel):
    student_id: str
    subjects: list[SubjectProgress]
