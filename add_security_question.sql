-- Add security_question column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS security_question TEXT;

-- Update existing users with a default value (their empresa)
UPDATE users SET security_question = empresa WHERE security_question IS NULL;
