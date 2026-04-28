CREATE TABLE public.generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  fingerprint TEXT NOT NULL,
  branch TEXT,
  year TEXT,
  skills TEXT[],
  interests TEXT[],
  career_goal TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own generated content" ON public.generated_content FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own generated content" ON public.generated_content FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own generated content" ON public.generated_content FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own generated content" ON public.generated_content FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_generated_content_updated_at
BEFORE UPDATE ON public.generated_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();