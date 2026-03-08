-- Seed initial products for each category

-- Glasses
INSERT INTO public.products (name, category, description, price, image_url, model_url, color, brand) VALUES
('Classic Aviator Sunglasses', 'glasses', 'Timeless aviator style with UV protection', 89.99, '/images/glasses-1.jpg', '/models/aviator.glb', 'Gold', 'RayBan'),
('Retro Cat Eye', 'glasses', 'Vintage-inspired cat eye frames', 79.99, '/images/glasses-2.jpg', '/models/cat-eye.glb', 'Black', 'Gucci'),
('Modern Square', 'glasses', 'Contemporary square frame design', 99.99, '/images/glasses-3.jpg', '/models/square.glb', 'Silver', 'Prada');

-- Clothing
INSERT INTO public.products (name, category, description, price, image_url, model_url, color, brand) VALUES
('Classic White T-Shirt', 'clothing', 'Premium cotton white t-shirt', 29.99, '/images/clothing-1.jpg', '/models/tshirt-white.glb', 'White', 'Uniqlo'),
('Blue Denim Jacket', 'clothing', 'Classic blue denim jacket', 119.99, '/images/clothing-2.jpg', '/models/denim-jacket.glb', 'Blue', 'Levi''s'),
('Black Casual Dress', 'clothing', 'Elegant black casual dress', 89.99, '/images/clothing-3.jpg', '/models/dress-black.glb', 'Black', 'Zara');

-- Hats
INSERT INTO public.products (name, category, description, price, image_url, model_url, color, brand) VALUES
('Baseball Cap', 'hats', 'Classic baseball cap', 29.99, '/images/hats-1.jpg', '/models/cap.glb', 'Navy', 'Nike'),
('Wool Beanie', 'hats', 'Warm wool knit beanie', 34.99, '/images/hats-2.jpg', '/models/beanie.glb', 'Gray', 'The North Face'),
('Summer Straw Hat', 'hats', 'Lightweight straw hat', 44.99, '/images/hats-3.jpg', '/models/straw-hat.glb', 'Natural', 'Santoni');

-- Jewelry
INSERT INTO public.products (name, category, description, price, image_url, model_url, color, brand) VALUES
('Diamond Solitaire Ring', 'jewelry', 'Elegant diamond ring', 1999.99, '/images/jewelry-1.jpg', '/models/ring-diamond.glb', 'Silver', 'Tiffany & Co'),
('Gold Bracelet', 'jewelry', 'Classic gold link bracelet', 499.99, '/images/jewelry-2.jpg', '/models/bracelet-gold.glb', 'Gold', 'Cartier'),
('Pearl Necklace', 'jewelry', 'Timeless pearl necklace', 299.99, '/images/jewelry-3.jpg', '/models/necklace-pearl.glb', 'White', 'Mikimoto');

-- Watches
INSERT INTO public.products (name, category, description, price, image_url, model_url, color, brand) VALUES
('Classic Analog Watch', 'watches', 'Minimalist analog watch', 199.99, '/images/watches-1.jpg', '/models/watch-analog.glb', 'Silver', 'Timex'),
('Luxury Smartwatch', 'watches', 'Advanced smartwatch with health tracking', 399.99, '/images/watches-2.jpg', '/models/watch-smart.glb', 'Black', 'Apple'),
('Vintage Leather Watch', 'watches', 'Vintage-style watch with leather strap', 149.99, '/images/watches-3.jpg', '/models/watch-leather.glb', 'Brown', 'Fossil');
