interface Step {
  label: string;
  num: number;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              currentStep >= s.num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > s.num ? "✓" : s.num}
          </div>
          <span
            className={`ml-2 text-sm hidden sm:block ${
              currentStep >= s.num ? "text-blue-600 font-medium" : "text-gray-400"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`mx-3 flex-1 h-0.5 w-6 sm:w-12 ${
                currentStep > s.num ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
