from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings

# Use Redis as storage backend when available, fall back to in-memory
_storage_uri = settings.redis_url if settings.redis_url else None

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200/minute"],
    storage_uri=_storage_uri,
)
