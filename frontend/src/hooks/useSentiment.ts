import { useCallback, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface SentimentData {
  emotion: string;
  confidence: number;
  action_taken: string | null;
}

export function useSentiment() {
  const [currentSentiment, setCurrentSentiment] = useState<SentimentData | null>(null);
  const [history, setHistory] = useState<SentimentData[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const chapterIdRef = useRef<string | null>(null);

  const connect = useCallback((chapterId: string) => {
    // Store chapter ID for frame submissions; nothing to "connect" for HTTP POST
    chapterIdRef.current = chapterId;
  }, []);

  const disconnect = useCallback(() => {
    chapterIdRef.current = null;
    setCurrentSentiment(null);
  }, []);

  /** Send a base64-encoded JPEG frame for analysis via authenticated HTTP POST. */
  const sendFrame = useCallback(async (frameBase64: string, chapterId: string) => {
    if (analyzing) return; // skip if previous analysis is still running
    setAnalyzing(true);

    try {
      let { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        const { data } = await supabase.auth.refreshSession();
        session = data.session;
      }
      if (!session?.access_token) return;

      const res = await fetch(`${API_URL}/api/video/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          frame_base64: frameBase64,
          // Only send chapter_id if it looks like a real UUID
          chapter_id: /^[0-9a-f-]{36}$/i.test(chapterId) ? chapterId : null,
        }),
      });

      if (!res.ok) return;

      const data: SentimentData = await res.json();
      if (data.emotion) {
        setCurrentSentiment(data);
        setHistory((prev) => [...prev.slice(-49), data]);
      }
    } catch {
      // silently ignore — sentiment is non-critical
    } finally {
      setAnalyzing(false);
    }
  }, [analyzing]);

  return { currentSentiment, history, analyzing, connect, disconnect, sendFrame };
}
