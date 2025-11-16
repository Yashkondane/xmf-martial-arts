-- Create students table with all required fields
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  date_of_birth TEXT,
  gender TEXT,
  contact_number TEXT,
  club_location TEXT,
  blood_group TEXT,
  weight TEXT,
  address TEXT,
  current_belt TEXT,
  guardian_name TEXT,
  emergency_contact TEXT
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for students to view their own data
CREATE POLICY "Students can view own data"
  ON public.students FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update own data"
  ON public.students FOR UPDATE
  USING (auth.uid() = id);

-- Create admin policy (admins can view all students)
CREATE POLICY "Admins can view all students"
  ON public.students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
