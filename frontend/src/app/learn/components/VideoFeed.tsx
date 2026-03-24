"use client";

import { useEffect, useRef } from "react";
import { useVideoFeed } from "@/hooks/useVideoFeed";
import { useSentiment } from "@/hooks/useSentiment";
import SentimentIndicator from "@/components/SentimentIndicator";

interface VideoFeedProps {
  chapterId: string;
}

export default function VideoFeed({ chapterId }: VideoFeedProps) {
  const { isActive, videoRef, startCamera, stopCamera, captureFrame } = useVideoFeed();
  const { currentSentiment, history, connect, disconnect, sendFrame } = useSentiment();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    connect(chapterId);
    return () => {
      disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [chapterId, connect, disconnect]);

  async function handleToggleCamera() {
    if (isActive) {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      await startCamera();
      // Capture and send a frame every 5 seconds for sentiment analysis
      intervalRef.current = setInterval(() => {
        const frame = captureFrame();
        if (frame) {
          sendFrame(frame, chapterId);
        }
      }, 5000);
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm">Video Sentiment</h3>
        <button
          onClick={handleToggleCamera}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
            isActive
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
          }`}
        >
          {isActive ? "Stop Camera" : "Start Camera"}
        </button>
      </div>

      {/* Video element */}
      <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full h-full object-cover ${!isActive ? "hidden" : ""}`}
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-xs">Camera off</p>
            </div>
          </div>
        )}
        {isActive && currentSentiment && (
          <div className="absolute bottom-2 left-2">
            <SentimentIndicator
              emotion={currentSentiment.emotion}
              confidence={currentSentiment.confidence}
            />
          </div>
        )}
      </div>

      {/* Adaptive action notification */}
      {currentSentiment?.action_taken && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
          💡 {currentSentiment.action_taken}
        </div>
      )}

      {/* Sentiment history mini-timeline */}
      {history.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Recent emotions</p>
          <div className="flex gap-1 flex-wrap">
            {history.slice(-10).map((entry, i) => {
              const colors: Record<string, string> = {
                engaged: "bg-green-400",
                happy: "bg-green-300",
                confused: "bg-yellow-400",
                bored: "bg-orange-400",
                frustrated: "bg-red-400",
                drowsy: "bg-gray-400",
              };
              return (
                <div
                  key={i}
                  title={`${entry.emotion} (${Math.round(entry.confidence * 100)}%)`}
                  className={`w-3 h-3 rounded-full ${colors[entry.emotion] ?? "bg-gray-300"}`}
                />
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        Frames are analyzed and immediately discarded. No video is stored.
      </p>
    </div>
  );
}
