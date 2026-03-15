export type Emotion = "engaged" | "confused" | "bored" | "frustrated" | "happy" | "drowsy";

export interface SentimentResult {
  emotion: Emotion;
  confidence: number;
  action_taken: string | null;
  timestamp: string;
}
