from fastapi import APIRouter, Depends

from app.dependencies import get_current_user

router = APIRouter()


@router.post("/verify")
async def verify_token(user: dict = Depends(get_current_user)):
    """Verify Supabase JWT and return user info."""
    return {
        "user_id": user.get("sub"),
        "email": user.get("email"),
        "role": user.get("role"),
    }
