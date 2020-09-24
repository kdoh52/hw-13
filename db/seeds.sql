USE burgers_db;

TRUNCATE TABLE burgers;

INSERT INTO burgers (burger_name) VALUES ('Double-Double');
INSERT INTO burgers (burger_name) VALUES ('Big Mac');
INSERT INTO burgers (burger_name) VALUES ('Whopper');

SELECT * FROM burgers;