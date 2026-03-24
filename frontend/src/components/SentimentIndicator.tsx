interface SentimentIndicatorProps {
  emotion: string;
  confidence: number;
}

const emotionColors: Record<string, string> = {
  engaged: "bg-green-500",
  happy: "bg-green-400",
  confused: "bg-yellow-500",
  bored: "bg-orange-500",
  frustrated: "bg-red-500",
  drowsy: "bg-gray-500",
};

export default function SentimentIndicator({ emotion, confidence }: SentimentIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${emotionColors[emotion] || "bg-gray-300"}`} />
      <span className="text-sm capitalize">{emotion}</span>
      <span className="text-xs text-gray-400">({Math.round(confidence * 100)}%)</span>
    </div>
  );
}
