"use client";

export default function LessonPage({
  params,
}: {
  params: { subjectId: string; chapterId: string };
}) {
  // TODO: Lesson view with content + chat + voice + video panels
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Lesson</h1>
      {/* TODO: LessonContent, VoiceChat, VideoFeed, DiagramRenderer, FormulaRenderer */}
    </main>
  );
}
