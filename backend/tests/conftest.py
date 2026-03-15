import pytest


@pytest.fixture
def sample_student():
    return {
        "name": "Test Student",
        "grade": "10",
        "background": "Interested in science",
        "interests": ["Physics", "Mathematics"],
    }


@pytest.fixture
def sample_chapter():
    return {
        "title": "Newton's Laws of Motion",
        "description": "Understanding the three fundamental laws of motion",
        "order_index": 1,
        "subject_name": "Physics",
    }
