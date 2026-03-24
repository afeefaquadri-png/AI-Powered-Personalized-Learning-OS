from slowapi import Limiter
from slowapi.util import get_remote_address

# Global limiter instance — imported by main.py and all routers that need per-route limits.
limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])
