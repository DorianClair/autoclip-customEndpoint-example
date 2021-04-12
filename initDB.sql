-- This is an example script you can run that will create a table that can hold answers (this matches the example function in queries.js)
drop table if exists forms;

CREATE TABLE answers (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255),
  answer VARCHAR(255),
  formId VARCHAR(255),
  userId VARCHAR(255)
);
