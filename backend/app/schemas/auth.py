from pydantic import BaseModel


class TokenVerifyResponse(BaseModel):
    user_id: str
    email: str
    role: str
