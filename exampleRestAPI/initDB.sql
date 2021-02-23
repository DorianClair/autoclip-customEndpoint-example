CREATE TABLE managers (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  pass VARCHAR(30),
  type VARCHAR(30) DEFAULT 'manager'
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  pass VARCHAR(30),
  manager_id integer,
  type VARCHAR(30) DEFAULT 'USER'
);

CREATE TABLE assignedForms (
  ID SERIAL PRIMARY KEY,
  form_id integer,
  user_id integer
);

CREATE TABLE forms (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  manager_id integer
);

CREATE TABLE questions (
  ID SERIAL PRIMARY KEY,
  form_id integer,
  title VARCHAR(255)
);