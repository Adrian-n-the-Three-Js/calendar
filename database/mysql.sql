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

CREATE TABLE IF NOT EXISTS hotelServices (
  id INT NOT NULL AUTO_INCREMENT,
  hotelId INT NOT NULL,
  name VARCHAR(30) NOT NULL  DEFAULT '',
  description VARCHAR(250) NOT NULL  DEFAULT '',
  price INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (hotelId) REFERENCES hotels (id)
);



-- DROP TABLE IF EXISTS serviceDetail;

CREATE TABLE IF NOT EXISTS serviceDetail (
  id INT NOT NULL AUTO_INCREMENT,
  serviceId INT NOT NULL,
  availableRoomType VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  FOREIGN KEY (serviceId) REFERENCES hotelServices (id)
);


/*
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