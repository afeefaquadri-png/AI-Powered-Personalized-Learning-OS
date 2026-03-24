import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-3xl">
        {/* Hero */}
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          AI-Powered K-12 Learning
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-4">
          Learn smarter,<br />
          <span className="text-blue-600">not harder.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          LearnOS is a personalised AI tutor that adapts to your grade, interests, and emotions —
          with voice tutoring, real-time sentiment analysis, and AI-generated curricula.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
          >
            Get started free →
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-sm"
          >
            Sign in
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Personalised Curriculum</h3>
            <p className="text-gray-500 text-sm">
              Claude AI builds a custom curriculum based on your grade, background, and goals — then teaches it step by step.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🎙️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Voice Tutoring</h3>
            <p className="text-gray-500 text-sm">
              Ask your AI tutor questions by voice with real-time speech-to-speech powered by OpenAI Realtime API.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">👁️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Smart Adaptation</h3>
            <p className="text-gray-500 text-sm">
              Your AI tutor reads your facial expressions and adapts — slowing down when confused, adding energy when bored.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16 text-left">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "1", label: "Sign up", desc: "Create a free account in seconds." },
              { step: "2", label: "Onboard", desc: "Tell us your grade and subjects." },
              { step: "3", label: "AI builds your curriculum", desc: "Claude generates a personalised course for you." },
              { step: "4", label: "Learn & get assessed", desc: "Chat, use voice, and take AI-evaluated quizzes." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border p-5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
