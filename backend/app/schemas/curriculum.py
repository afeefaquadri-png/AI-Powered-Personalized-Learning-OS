from pydantic import BaseModel


class ChapterSummary(BaseModel):
    id: str | None = None
    order_index: int
    title: str
    description: str
    status: str = "locked"


class CurriculumGenerateRequest(BaseModel):
    subject_name: str
    grade: str | None = None
    board: str | None = None  # e.g. "CBSE", "ICSE", "Cambridge IGCSE", "IB", "Common Core"
    background: str | None = None
    difficulty_level: str = "beginner"


class CurriculumResponse(BaseModel):
    subject_id: str
    subject_name: str
    chapters: list[ChapterSummary]
