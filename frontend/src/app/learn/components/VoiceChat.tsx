"use client";

import { useVoiceChat } from "@/hooks/useVoiceChat";

interface VoiceChatProps {
  chapterId: string;
}

export default function VoiceChat({ chapterId }: VoiceChatProps) {
  const {
    isConnected,
    isListening,
    isAISpeaking,
    transcript,
    connect,
    disconnect,
    toggleListening,
  } = useVoiceChat();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">Voice Tutor</h3>
        <p className="text-gray-500 text-sm">
          Talk to your AI tutor hands-free. Ask questions, get explanations, all by voice.
        </p>
      </div>

      {/* Connection controls */}
      <div className="flex gap-3 mb-6">
        {!isConnected ? (
          <button
            onClick={connect}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            🎙️ Connect Voice Session
          </button>
        ) : (
          <button
            onClick={disconnect}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Disconnect
          </button>
        )}
      </div>

      {isConnected && (
        <>
          {/* Mic button + AI speaking indicator */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <button
              onClick={toggleListening}
              disabled={isAISpeaking}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all ${
                isListening
                  ? "bg-red-500 text-white scale-110 animate-pulse"
                  : isAISpeaking
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              title={
                isAISpeaking
                  ? "AI is speaking…"
                  : isListening
                  ? "Stop listening"
                  : "Start listening"
              }
            >
              {isListening ? "🔴" : "🎤"}
            </button>

            {/* Status label */}
            {isAISpeaking ? (
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
                AI is speaking…
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                {isListening ? "Listening… speak now" : "Tap to speak"}
              </p>
            )}
          </div>

          {/* Transcript */}
          <div className="flex-1 bg-gray-50 rounded-xl border p-4 overflow-y-auto space-y-3">
            {transcript.length === 0 ? (
              <p className="text-sm text-gray-400 text-center pt-8">
                Your conversation will appear here…
              </p>
            ) : (
              transcript.map((line, i) => (
                <div
                  key={i}
                  className={`text-sm p-3 rounded-xl ${
                    line.startsWith("You:") || line.startsWith("Student:")
                      ? "bg-blue-100 text-blue-900 ml-8"
                      : "bg-white border text-gray-800 mr-8 shadow-sm"
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {!isConnected && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-5xl mb-3">🎙️</div>
            <p className="font-medium text-gray-500">Voice tutoring</p>
            <p className="text-sm mt-1 max-w-xs">
              Connect a voice session to speak directly with your AI tutor using real-time speech recognition.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
