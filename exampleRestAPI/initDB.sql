drop table forms;
drop table managers;
drop table questions;
drop table users;
drop table assignedforms;

CREATE TABLE managers (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  pass VARCHAR(255),
  phone VARCHAR(255),
  type VARCHAR(255) DEFAULT 'manager'
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  pass VARCHAR(255),
  phone VARCHAR(255),
  manager_id integer,
  type VARCHAR(255) DEFAULT 'USER'
);

CREATE TABLE assignedforms (
  ID SERIAL PRIMARY KEY,
  form_id integer,
  user_id integer
);

CREATE TABLE forms (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  manager_id integer
);

CREATE TABLE questions (
  ID SERIAL PRIMARY KEY,
  form_id integer,
  title VARCHAR(255)
);

CREATE TABLE answers (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255),
  answer VARCHAR(255),
  formId VARCHAR(255),
  userId VARCHAR(255)
);
