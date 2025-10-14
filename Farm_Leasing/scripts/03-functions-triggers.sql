-- Database Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at
  BEFORE UPDATE ON public.equipment
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification on new booking
CREATE OR REPLACE FUNCTION notify_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify equipment owner
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (
    NEW.owner_id,
    'New Booking Request',
    'You have a new booking request for your equipment',
    'booking',
    '/my-equipment'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_booking
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_booking();

-- Function to create notification on booking status change
CREATE OR REPLACE FUNCTION notify_booking_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    -- Notify farmer
    INSERT INTO public.notifications (user_id, title, message, type, link)
    VALUES (
      NEW.farmer_id,
      'Booking Status Updated',
      'Your booking status has been updated to: ' || NEW.status,
      'booking',
      '/my-bookings'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_booking_status_change
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking_status_change();

-- Function to update equipment status based on bookings
CREATE OR REPLACE FUNCTION update_equipment_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' THEN
    UPDATE public.equipment
    SET status = 'rented'
    WHERE id = NEW.equipment_id;
  ELSIF NEW.status = 'completed' OR NEW.status = 'cancelled' THEN
    -- Check if there are other active bookings
    IF NOT EXISTS (
      SELECT 1 FROM public.bookings
      WHERE equipment_id = NEW.equipment_id AND status = 'active'
    ) THEN
      UPDATE public.equipment
      SET status = 'available'
      WHERE id = NEW.equipment_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_booking_status_update_equipment
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_equipment_status();
