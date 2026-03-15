export interface Student {
  id: string;
  name: string;
  grade: string;
  background: string | null;
  interests: string[];
  marksheet_path: string | null;
  onboarding_completed: boolean;
}

export interface OnboardingData {
  name: string;
  grade: string;
  background: string | null;
  interests: string[];
  learning_goals: string | null;
}
