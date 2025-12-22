-- =====================================================
-- EAI E-Learning Platform - RLS Policies
-- =====================================================

-- =====================================================
-- Enable RLS on all tables
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Everyone can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Everyone can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- COURSES POLICIES
-- =====================================================

-- Students can view published courses
CREATE POLICY "Students can view published courses"
  ON courses FOR SELECT
  USING (
    is_published = TRUE
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can do everything with courses
CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- MODULES POLICIES
-- =====================================================

-- Students can view modules of published courses
CREATE POLICY "Students can view modules of published courses"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id AND courses.is_published = TRUE
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage all modules
CREATE POLICY "Admins can manage modules"
  ON modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- LESSONS POLICIES
-- =====================================================

-- Students can view lessons of published courses
CREATE POLICY "Students can view lessons of published courses"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN courses ON courses.id = modules.course_id
      WHERE modules.id = lessons.module_id AND courses.is_published = TRUE
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage all lessons
CREATE POLICY "Admins can manage lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- ASSESSMENTS POLICIES
-- =====================================================

-- Students can view assessments of published courses
CREATE POLICY "Students can view assessments"
  ON assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE lessons.id = assessments.lesson_id AND courses.is_published = TRUE
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage assessments
CREATE POLICY "Admins can manage assessments"
  ON assessments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- QUESTIONS POLICIES
-- =====================================================

-- CRITICAL: Students can view questions BUT NOT correct_answer
-- This is enforced in the application layer by selecting only needed columns
-- RLS only controls row access, not column access

-- Students can view questions of published courses
CREATE POLICY "Students can view questions"
  ON questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      JOIN lessons ON lessons.id = assessments.lesson_id
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE assessments.id = questions.assessment_id AND courses.is_published = TRUE
    )
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage questions
CREATE POLICY "Admins can manage questions"
  ON questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- ENROLLMENTS POLICIES
-- =====================================================

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = student_id);

-- Students can create their own enrollments (enroll in courses)
CREATE POLICY "Students can enroll in courses"
  ON enrollments FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND
    EXISTS (
      SELECT 1 FROM courses
      WHERE id = course_id AND is_published = TRUE
    )
  );

-- Students can delete their own enrollments (unenroll)
CREATE POLICY "Students can unenroll"
  ON enrollments FOR DELETE
  USING (auth.uid() = student_id);

-- Admins can view all enrollments
CREATE POLICY "Admins can view all enrollments"
  ON enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- LESSON PROGRESS POLICIES
-- =====================================================

-- Students can view their own progress
CREATE POLICY "Students can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = student_id);

-- Students can mark lessons as complete
CREATE POLICY "Students can mark lessons complete"
  ON lesson_progress FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE lessons.id = lesson_id AND courses.is_published = TRUE
    )
    AND
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE student_id = auth.uid()
      AND course_id = (
        SELECT courses.id FROM lessons
        JOIN modules ON modules.id = lessons.module_id
        JOIN courses ON courses.id = modules.course_id
        WHERE lessons.id = lesson_id
      )
    )
  );

-- Admins can view all progress
CREATE POLICY "Admins can view all progress"
  ON lesson_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- ASSESSMENT ATTEMPTS POLICIES
-- =====================================================

-- Students can view their own attempts
CREATE POLICY "Students can view own attempts"
  ON assessment_attempts FOR SELECT
  USING (auth.uid() = student_id);

-- Students can create their own attempts
CREATE POLICY "Students can submit attempts"
  ON assessment_attempts FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND
    EXISTS (
      SELECT 1 FROM assessments
      JOIN lessons ON lessons.id = assessments.lesson_id
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE assessments.id = assessment_id AND courses.is_published = TRUE
    )
  );

-- Admins can view all attempts
CREATE POLICY "Admins can view all attempts"
  ON assessment_attempts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- CERTIFICATES POLICIES
-- =====================================================

-- Students can view their own certificates
CREATE POLICY "Students can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = student_id);

-- Certificates are created by triggers/functions (not directly by users)
-- So we need a service role policy for inserts

-- Admins can view all certificates
CREATE POLICY "Admins can view all certificates"
  ON certificates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage certificates
CREATE POLICY "Admins can manage certificates"
  ON certificates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
