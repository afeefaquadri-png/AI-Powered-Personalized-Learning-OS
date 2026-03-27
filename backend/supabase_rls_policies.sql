-- ============================================================
-- LearnOS — Row Level Security Policies
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE POLICY "Students can read own profile"
  ON students FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- SUBJECTS
-- ============================================================
CREATE POLICY "Students can read own subjects"
  ON subjects FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own subjects"
  ON subjects FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own subjects"
  ON subjects FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Students can delete own subjects"
  ON subjects FOR DELETE
  USING (auth.uid() = student_id);

-- ============================================================
-- CHAPTERS (accessed via subject ownership)
-- ============================================================
CREATE POLICY "Students can read chapters of own subjects"
  ON chapters FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = chapters.subject_id
        AND subjects.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can insert chapters for own subjects"
  ON chapters FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = chapters.subject_id
        AND subjects.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can update chapters of own subjects"
  ON chapters FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = chapters.subject_id
        AND subjects.student_id = auth.uid()
    )
  );

-- ============================================================
-- ACTIVITIES (accessed via chapter → subject ownership)
-- ============================================================
CREATE POLICY "Students can read activities for own chapters"
  ON activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chapters
      JOIN subjects ON subjects.id = chapters.subject_id
      WHERE chapters.id = activities.chapter_id
        AND subjects.student_id = auth.uid()
    )
  );

-- ============================================================
-- ACTIVITY SUBMISSIONS
-- ============================================================
CREATE POLICY "Students can read own submissions"
  ON activity_submissions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own submissions"
  ON activity_submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own submissions"
  ON activity_submissions FOR UPDATE
  USING (auth.uid() = student_id);

-- ============================================================
-- CHAT MESSAGES
-- ============================================================
CREATE POLICY "Students can read own chat messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- ============================================================
-- SENTIMENT LOGS
-- ============================================================
CREATE POLICY "Students can read own sentiment logs"
  ON sentiment_logs FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own sentiment logs"
  ON sentiment_logs FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- ============================================================
-- STUDENT PROGRESS
-- ============================================================
CREATE POLICY "Students can read own progress"
  ON student_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own progress"
  ON student_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own progress"
  ON student_progress FOR UPDATE
  USING (auth.uid() = student_id);

-- ============================================================
-- STUDENT NOTES
-- ============================================================
CREATE POLICY "Students can read own notes"
  ON student_notes FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own notes"
  ON student_notes FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own notes"
  ON student_notes FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Students can delete own notes"
  ON student_notes FOR DELETE
  USING (auth.uid() = student_id);

-- ============================================================
-- SERVICE ROLE BYPASS
-- The FastAPI backend uses the service role key which bypasses
-- RLS automatically — no additional policies needed for it.
-- ============================================================

-- ============================================================
-- SUPABASE REALTIME — Enable for live dashboard updates
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE student_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE sentiment_logs;

-- ============================================================
-- STORAGE BUCKET POLICIES — marksheets bucket
-- Run after creating the bucket in Supabase dashboard
-- ============================================================
-- Allow students to upload their own marksheet
CREATE POLICY "Students can upload own marksheet"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'marksheets'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow students to read their own marksheet
CREATE POLICY "Students can read own marksheet"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'marksheets'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
