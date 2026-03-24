"""Tests for sentiment analyzer service."""

from app.services.sentiment_analyzer import determine_adaptive_action


def test_adaptive_action_bored():
    action = determine_adaptive_action("bored", 0.8)
    assert action is not None
    assert "interactive" in action.lower() or "simplify" in action.lower()


def test_adaptive_action_low_confidence():
    action = determine_adaptive_action("bored", 0.3)
    assert action is None


def test_adaptive_action_engaged():
    action = determine_adaptive_action("engaged", 0.9)
    assert action is None
