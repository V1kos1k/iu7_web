-- Script to run query: 
-- psql -U postgres < createdb.pgsql

-- DROP DATABASE IF EXISTS table_hub;
-- CREATE DATABASE table_hub OWNER postgres;

-- \c table_hub;

CREATE TABLE IF NOT EXISTS _user (
    id serial,
    email TEXT UNIQUE NOT NULL,
    login TEXT UNIQUE NOT NULL PRIMARY KEY,
    password_hash TEXT NOT NULL,
    name TEXT,
    surname TEXT,
    date_birth DATE NOT NULL,
    gender INT NOT NULL,
    city TEXT,
    about_me TEXT,
    favorite_genres TEXT[],
    favorite_games TEXT[]
);

CREATE TABLE IF NOT EXISTS _chat (
    id serial PRIMARY KEY,
    time_creation DATE
);

CREATE TABLE IF NOT EXISTS _user_chat (
    user_login TEXT REFERENCES _user,
    chat_id INT REFERENCES _chat
);

CREATE TABLE IF NOT EXISTS _desk (
    id serial PRIMARY KEY,
    owner_login TEXT,
    max_people INT,
    current_people INT,
    ages INT[],
    gender INT,
    title TEXT,
    city TEXT,
    is_private BOOLEAN,
    chat_id INT REFERENCES _chat,
    genres TEXT[],
    games TEXT[]
);

CREATE TABLE IF NOT EXISTS _user_desk (
    user_login TEXT REFERENCES _user,
    desk_id INT REFERENCES _desk,
    isIn BOOLEAN
);


CREATE TABLE IF NOT EXISTS _messages (
    id serial PRIMARY KEY,
    chat_id INT REFERENCES _chat,
    from_user TEXT,
    message TEXT,
    sendTime TIMESTAMP
);


CREATE TABLE IF NOT EXISTS _unread_messages (
    message_id INT REFERENCES _messages,
    chat_id INT REFERENCES _chat
);
