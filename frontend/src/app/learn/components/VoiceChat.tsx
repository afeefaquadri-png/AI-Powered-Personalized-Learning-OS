"use client";

import { useVoiceChat } from "@/hooks/useVoiceChat";

export default function VoiceChat() {
  const { isConnected, isListening, transcript, connect, disconnect, toggleListening } = useVoiceChat();

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold mb-2">Voice Tutor</h3>
      {/* TODO: Voice chat UI with connect/disconnect, mic toggle, transcript */}
    </div>
  );
}
