DROP database if exists great_bay_db;
CREATE database great_bay_db;

USE great_bay_db;

CREATE TABLE posts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  section VARCHAR(40) NOT NULL,
  bid DECIMAL NOT NULL
);

INSERT INTO posts (name, section, bid) VALUES ("Haunted Doll", "Toys", 30);

SELECT * FROM posts;