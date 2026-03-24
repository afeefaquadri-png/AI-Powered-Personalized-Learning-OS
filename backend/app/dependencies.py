from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import verify_supabase_jwt
from app.core.database import get_db_session

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """Extract and verify the Supabase JWT, return user payload."""
    token = credentials.credentials
    print("[DEBUG] Received JWT token:", token)
    payload = verify_supabase_jwt(token)
    if payload is None:
        print("[DEBUG] JWT verification failed for token:", token)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    print("[DEBUG] JWT verified, payload:", payload)
    return payload
