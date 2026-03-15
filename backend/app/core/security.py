from jose import JWTError, jwt

from app.config import settings


def verify_supabase_jwt(token: str) -> dict | None:
    """Verify a Supabase-issued JWT and return the payload."""
    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload
    except JWTError:
        return None
