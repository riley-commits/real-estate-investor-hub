
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  company_name TEXT NOT NULL DEFAULT '',
  bio TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create operator_projects table (separate from mock data)
CREATE TABLE public.operator_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  project_type TEXT NOT NULL DEFAULT 'Multifamily',
  deal_type TEXT NOT NULL DEFAULT 'Equity',
  status TEXT NOT NULL DEFAULT 'Coming Soon',
  target_irr NUMERIC DEFAULT 0,
  equity_multiple NUMERIC DEFAULT 0,
  min_investment NUMERIC DEFAULT 0,
  hold_period TEXT DEFAULT '',
  target_raise NUMERIC DEFAULT 0,
  raised_amount NUMERIC DEFAULT 0,
  image_url TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',
  purchase_price NUMERIC DEFAULT 0,
  total_capitalization NUMERIC DEFAULT 0,
  loan_to_value NUMERIC DEFAULT 0,
  projected_noi NUMERIC DEFAULT 0,
  cap_rate NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.operator_projects ENABLE ROW LEVEL SECURITY;

-- Helper function: get profile id for current user
CREATE OR REPLACE FUNCTION public.get_my_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1
$$;

-- Profiles RLS
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Operator projects RLS
CREATE POLICY "Anyone can view operator projects" ON public.operator_projects FOR SELECT USING (true);
CREATE POLICY "Operators can insert own projects" ON public.operator_projects FOR INSERT WITH CHECK (operator_id = public.get_my_profile_id());
CREATE POLICY "Operators can update own projects" ON public.operator_projects FOR UPDATE USING (operator_id = public.get_my_profile_id());
CREATE POLICY "Operators can delete own projects" ON public.operator_projects FOR DELETE USING (operator_id = public.get_my_profile_id());

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_operator_projects_updated_at BEFORE UPDATE ON public.operator_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
