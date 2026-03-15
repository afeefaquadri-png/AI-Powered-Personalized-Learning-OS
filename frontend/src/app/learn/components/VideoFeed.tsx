"use client";

import { useVideoFeed } from "@/hooks/useVideoFeed";

export default function VideoFeed() {
  const { isActive, videoRef, startCamera, stopCamera } = useVideoFeed();

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold mb-2">Video Feed</h3>
      <video ref={videoRef} autoPlay muted className="w-full rounded" />
      {/* TODO: Camera toggle, sentiment indicator overlay */}
    </div>
  );
}
