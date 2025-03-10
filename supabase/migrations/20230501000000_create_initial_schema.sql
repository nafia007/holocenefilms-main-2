-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_artist BOOLEAN DEFAULT FALSE,
  wallet_address TEXT
);

-- Create art_styles table
CREATE TABLE art_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  artist_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  token_id TEXT UNIQUE,
  price DECIMAL(12, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  art_style_id UUID REFERENCES art_styles(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  transaction_hash TEXT
);

-- Create generated_artworks table
CREATE TABLE generated_artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  art_style_id UUID REFERENCES art_styles(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  prompt TEXT,
  is_public BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX idx_art_styles_artist_id ON art_styles(artist_id);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_transactions_art_style_id ON transactions(art_style_id);
CREATE INDEX idx_generated_artworks_user_id ON generated_artworks(user_id);
CREATE INDEX idx_generated_artworks_art_style_id ON generated_artworks(art_style_id);

-- Add triggers to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_art_styles_modtime
BEFORE UPDATE ON art_styles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();