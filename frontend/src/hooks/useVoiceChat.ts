import { useCallback, useRef, useState } from "react";

export function useVoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(async () => {
    // TODO: Connect to FastAPI voice WebSocket endpoint
    setIsConnected(true);
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    setIsConnected(false);
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    setIsListening((prev) => !prev);
  }, []);

  return { isConnected, isListening, transcript, connect, disconnect, toggleListening };
}
