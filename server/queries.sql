CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100)
)