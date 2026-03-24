import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WS_URL = API_URL.replace(/^http/, "ws");

export function useVoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const isAISpeakingRef = useRef(false);

  const appendTranscript = useCallback((line: string) => {
    setTranscript((prev) => [...prev, line]);
  }, []);

  const playNextAudio = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;
    isPlayingRef.current = true;

    const buffer = audioQueueRef.current.shift()!;
    try {
      const ctx = audioContextRef.current ?? new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = ctx;
      const decoded = await ctx.decodeAudioData(buffer.slice(0));
      const source = ctx.createBufferSource();
      source.buffer = decoded;
      source.connect(ctx.destination);
      source.onended = () => {
        isPlayingRef.current = false;
        playNextAudio();
      };
      source.start();
    } catch {
      isPlayingRef.current = false;
      playNextAudio();
    }
  }, []);

  const cancelAIResponse = useCallback(() => {
    // Clear the audio playback queue and stop current playback
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    isAISpeakingRef.current = false;
    setIsAISpeaking(false);
    // Signal OpenAI to cancel the in-progress response
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "response.cancel" }));
    }
  }, []);

  const connect = useCallback(async () => {
    if (wsRef.current) return;

    const ws = new WebSocket(`${WS_URL}/api/voice/ws`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      // Send session config
      ws.send(
        JSON.stringify({
          type: "session.update",
          session: {
            modalities: ["audio", "text"],
            instructions:
              "You are a helpful AI tutor for K-12 students. Be patient, encouraging, and use the Socratic method.",
            voice: "alloy",
            turn_detection: { type: "server_vad", silence_duration_ms: 800 },
          },
        })
      );
    };

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // Raw audio from the assistant
        audioQueueRef.current.push(event.data);
        playNextAudio();
        return;
      }

      try {
        const msg = JSON.parse(event.data as string);

        // Student started speaking — interrupt the AI if it's mid-response
        if (msg.type === "input_audio_buffer.speech_started") {
          if (isAISpeakingRef.current) {
            cancelAIResponse();
          }
        }

        if (msg.type === "response.audio.delta" && msg.delta) {
          // Base64-encoded audio delta — mark AI as speaking
          isAISpeakingRef.current = true;
          setIsAISpeaking(true);
          const binary = atob(msg.delta);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          audioQueueRef.current.push(bytes.buffer);
          playNextAudio();
        }

        if (msg.type === "response.done") {
          isAISpeakingRef.current = false;
          setIsAISpeaking(false);
        }

        if (msg.type === "conversation.item.input_audio_transcription.completed") {
          appendTranscript(`You: ${msg.transcript}`);
        }

        if (msg.type === "response.text.delta" && msg.delta) {
          setTranscript((prev) => {
            const last = prev[prev.length - 1];
            if (last?.startsWith("Tutor:")) {
              return [...prev.slice(0, -1), last + msg.delta];
            }
            return [...prev, `Tutor: ${msg.delta}`];
          });
        }
      } catch {}
    };

    ws.onclose = () => {
      setIsConnected(false);
      setIsListening(false);
      setIsAISpeaking(false);
      isAISpeakingRef.current = false;
      wsRef.current = null;
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [appendTranscript, playNextAudio, cancelAIResponse]);

  const disconnect = useCallback(() => {
    setIsListening(false);
    setIsAISpeaking(false);
    isAISpeakingRef.current = false;
    processorRef.current?.disconnect();
    processorRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    wsRef.current?.close();
    wsRef.current = null;
    audioContextRef.current?.close();
    audioContextRef.current = null;
  }, []);

  const toggleListening = useCallback(async () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    if (isListening) {
      // Stop microphone capture
      processorRef.current?.disconnect();
      processorRef.current = null;
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      setIsListening(false);
    } else {
      // Start microphone capture
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const ctx = audioContextRef.current ?? new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        // Use ScriptProcessor to get raw PCM (16-bit) and forward to OpenAI
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
          const floatData = e.inputBuffer.getChannelData(0);
          // Convert float32 to int16 PCM
          const pcm = new Int16Array(floatData.length);
          for (let i = 0; i < floatData.length; i++) {
            pcm[i] = Math.max(-32768, Math.min(32767, Math.round(floatData[i] * 32767)));
          }
          // Send as base64-encoded audio append event
          const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm.buffer)));
          wsRef.current.send(
            JSON.stringify({ type: "input_audio_buffer.append", audio: base64 })
          );
        };

        source.connect(processor);
        processor.connect(ctx.destination);
        setIsListening(true);
      } catch {
        // Microphone access denied or unavailable
      }
    }
  }, [isListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { disconnect(); };
  }, [disconnect]);

  return { isConnected, isListening, isAISpeaking, transcript, connect, disconnect, toggleListening };
}
