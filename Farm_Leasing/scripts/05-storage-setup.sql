-- Storage Setup for Equipment Images

-- Create storage bucket for equipment images
INSERT INTO storage.buckets (id, name, public)
VALUES ('equipment-images', 'equipment-images', true);

-- Storage policies for equipment images
CREATE POLICY "Anyone can view equipment images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'equipment-images');

CREATE POLICY "Owners can upload equipment images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'equipment-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

CREATE POLICY "Owners can update their equipment images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'equipment-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

CREATE POLICY "Owners can delete their equipment images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'equipment-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );
