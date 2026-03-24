import anthropic
import openai

from app.config import settings

claude_client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
openai_client = openai.AsyncOpenAI(api_key=settings.openai_api_key)
