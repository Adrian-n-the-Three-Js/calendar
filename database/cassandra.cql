CREATE KEYSPACE IF NOT EXISTS hotelCalendar WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE hotelCalendar;


DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS hotelRooms;
DROP TABLE IF EXISTS roomReservations;
DROP TABLE IF EXISTS hotelServices;
DROP TABLE IF EXISTS serviceDetails;


CREATE TABLE hotels (
  id INT,
  name TEXT,
  roomsTotal INT,
  PRIMARY KEY (id)
);


CREATE TABLE hotelRooms (
  id INT,
  hotelId INT,
  roomType TEXT,
  maxGuestPerRoom INT,
  isBooked BOOLEAN,
  isBookable BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (id)
);


CREATE TABLE roomReservations (
  id INT,
  roomlId INT,
  startDate TEXT,
  endDate TEXT,
  PRIMARY KEY (id)
);


CREATE TABLE hotelServices (
  id INT,
  hotelId INT,
  name TEXT,
  description TEXT,
  price VARINT,
  PRIMARY KEY (id)
);


CREATE TABLE serviceDetails (
  id INT,
  serviceId INT,
  availableRoomType TEXT,
  PRIMARY KEY (id)
);