import { useCallback, useRef, useState } from "react";

const API_URL = "/api/proxy";

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
  // Prevent sending a new frame before the previous analysis response arrives
  const pendingRef = useRef(false);

  const connect = useCallback(async (chapterId: string) => {
    chapterIdRef.current = chapterId;
  }, []);

  const disconnect = useCallback(() => {
    chapterIdRef.current = null;
    pendingRef.current = false;
    setCurrentSentiment(null);
    setAnalyzing(false);
  }, []);

  /** Send a base64-encoded JPEG frame for live sentiment analysis via HTTP POST. */
  const sendFrame = useCallback(async (frameBase64: string, chapterId: string) => {
    if (pendingRef.current) return; // skip — previous frame still being analyzed
    pendingRef.current = true;
    setAnalyzing(true);

    try {
      const { supabase } = await import("@/lib/supabase");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      const res = await fetch(`${API_URL}/api/video/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          frame_base64: frameBase64,
          chapter_id: /^[0-9a-f-]{36}$/i.test(chapterId) ? chapterId : null,
        }),
      });

      if (res.ok) {
        const data: SentimentData = await res.json();
        if (data.emotion) {
          setCurrentSentiment(data);
          setHistory((prev) => [...prev.slice(-49), data]);
        }
      }
    } catch {
      // Silently degrade — sentiment is non-critical
    } finally {
      pendingRef.current = false;
      setAnalyzing(false);
    }
  }, []);

  return { currentSentiment, history, analyzing, connect, disconnect, sendFrame };
}
