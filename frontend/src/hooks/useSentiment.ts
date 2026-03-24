import { useCallback, useRef, useState } from "react";

export interface SentimentData {
  emotion: string;
  confidence: number;
  action_taken: string | null;
}

export function useSentiment() {
  const [currentSentiment, setCurrentSentiment] = useState<SentimentData | null>(null);
  const [history, setHistory] = useState<SentimentData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback((chapterId: string) => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws")}/api/video/sentiment/ws`
    );
    ws.onmessage = (event) => {
      const data: SentimentData = JSON.parse(event.data);
      setCurrentSentiment(data);
      setHistory((prev) => [...prev, data]);
    };
    wsRef.current = ws;
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
  }, []);

  return { currentSentiment, history, connect, disconnect };
}
