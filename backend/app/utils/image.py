import base64


def frame_to_base64(frame_bytes: bytes) -> str:
    """Encode an image frame to base64 for Claude Vision API."""
    return base64.b64encode(frame_bytes).decode("utf-8")


def base64_to_frame(b64_string: str) -> bytes:
    """Decode a base64 string back to image bytes."""
    return base64.b64decode(b64_string)
