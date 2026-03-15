from supabase import create_client, Client

from app.config import settings


def get_supabase_client() -> Client:
    """Returns a Supabase client using the service role key (full access)."""
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def get_supabase_anon_client() -> Client:
    """Returns a Supabase client using the anon key (RLS-restricted)."""
    return create_client(settings.supabase_url, settings.supabase_anon_key)
