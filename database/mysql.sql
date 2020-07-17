

DROP DATABASE IF EXISTS hotelCalendar;

CREATE DATABASE IF NOT EXISTS hotelCalendar;

USE hotelCalendar;

-- DROP TABLE IF EXISTS hotels;

CREATE TABLE IF NOT EXISTS hotels (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  roomsTotal INT NOT NULL  DEFAULT 1,
  PRIMARY KEY (id)
);



-- DROP TABLE IF EXISTS hotelRooms;

CREATE TABLE IF NOT EXISTS hotelRooms (
  id INT NOT NULL AUTO_INCREMENT,
  hotelId INT NOT NULL,
  roomType VARCHAR(30) NOT NULL  DEFAULT '',
  maxGuestPerRoom INT NOT NULL DEFAULT 1,
  isBooked BOOLEAN NOT NULL DEFAULT false,
  isBookable BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (id),
  FOREIGN KEY (hotelId) REFERENCES hotels (id)
);




-- DROP TABLE IF EXISTS roomReservations

CREATE TABLE IF NOT EXISTS roomReservations (
  id INT NOT NULL AUTO_INCREMENT,
  roomlId INT NOT NULL,
  startDate VARCHAR(30) NOT NULL  DEFAULT '',
  endDate VARCHAR(30) NOT NULL  DEFAULT '',
  PRIMARY KEY (id),
  FOREIGN KEY (roomlId) REFERENCES hotelRooms (id)
);






-- DROP TABLE IF EXISTS hotelServices;

CREATE TABLE IF NOT EXISTS hotelProviders (
  id INT NOT NULL AUTO_INCREMENT,
  hotelId INT NOT NULL,
  roomId INT NOT NULL,
  name VARCHAR(30) NOT NULL  DEFAULT '',
  price INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (hotelId) REFERENCES hotels (id),
  FOREIGN KEY (roomId) REFERENCES hotelRooms (id)
);



/*

mysql -u noobdev -p < mysql.sql

for f in  *.csv;
do  mysql -u noobdev -ppost -e "LOAD DATA LOCAL INFILE '"$f"' INTO TABLE roomReservations fields terminated by ',' lines terminated by '\n' ignore 1 lines" hotelCalendar;
done



https://stackoverflow.com/questions/201621/how-do-i-see-all-foreign-keys-to-a-table-or-column/201678#201678

Checking Foreign key related to HOTELS tables


SELECT
  TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
FROM
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  REFERENCED_TABLE_SCHEMA = 'hotelCalendar' AND
  REFERENCED_TABLE_NAME = 'hotels';

*/