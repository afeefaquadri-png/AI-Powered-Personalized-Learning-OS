"use client";

export default function ActivityPage({
  params,
}: {
  params: { subjectId: string; chapterId: string };
}) {
  // TODO: Post-chapter activity and evaluation
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Chapter Activity</h1>
      {/* TODO: ActivityPanel with submission and AI evaluation */}
    </main>
  );
}
