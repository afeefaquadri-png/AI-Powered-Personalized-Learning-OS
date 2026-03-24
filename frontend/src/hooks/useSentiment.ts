import { useCallback, useRef, useState } from "react";

export interface SentimentData {
  emotion: string;
  confidence: number;
  action_taken: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WS_URL = API_URL.replace(/^http/, "ws");

export function useSentiment() {
  const [currentSentiment, setCurrentSentiment] = useState<SentimentData | null>(null);
  const [history, setHistory] = useState<SentimentData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback((chapterId: string) => {
    if (wsRef.current) return;

    const ws = new WebSocket(`${WS_URL}/api/video/sentiment/ws`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data: SentimentData = JSON.parse(event.data as string);
        if (data.emotion) {
          setCurrentSentiment(data);
          setHistory((prev) => [...prev.slice(-49), data]);
        }
      } catch {}
    };

    ws.onerror = () => {
      ws.close();
      wsRef.current = null;
    };

    ws.onclose = () => {
      wsRef.current = null;
    };
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  /** Send a base64-encoded JPEG frame for analysis */
  const sendFrame = useCallback((frameBase64: string, chapterId: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ frame_base64: frameBase64, chapter_id: chapterId }));
  }, []);

  return { currentSentiment, history, connect, disconnect, sendFrame };
}
