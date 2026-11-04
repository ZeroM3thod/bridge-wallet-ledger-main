CREATE TABLE email_code_attempts (
  email TEXT PRIMARY KEY COLLATE NOCASE,
  count INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
