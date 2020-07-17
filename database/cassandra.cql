DROP KEYSPACE IF EXISTS hotelCalendar;
CREATE KEYSPACE IF NOT EXISTS hotelCalendar WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE hotelCalendar;

-- DROP TABLE IF EXISTS hotels;
-- DROP TABLE IF EXISTS hotelRooms;
-- DROP TABLE IF EXISTS roomReservations;
-- DROP TABLE IF EXISTS hotelServices;
-- DROP TABLE IF EXISTS serviceDetails;
-- DROP TABLE IF EXISTS services_by_room;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS reservations_by_hotel_date;
DROP TABLE IF EXISTS fees_by_room;

CREATE TABLE IF NOT EXISTS hotels (
  id INT,
  name TEXT,
  PRIMARY KEY (id, name)
);

CREATE TABLE IF NOT EXISTS reservations_by_hotel_date (
  hotelId INT,
  roomId INT,
  maxGuest INT,
  startDate TEXT,
  endDate TEXT,
  PRIMARY KEY (hotelId, roomId, startDate)
);


CREATE TABLE IF NOT EXISTS fees_by_room (
  hotelId INT,
  priceAdult INT,
  priceKid INT,
  name TEXT,
  PRIMARY KEY (hotelId, priceAdult, priceKid)
);

-- cqlsh localhost -u cassandra -p cassandra -f calendar/database/cassandra.cql
-- COPY hotelcalendar.reservations_by_hotel_date (hotelId, roomId, maxGuest, startdate, enddate) from 'reservations_0.csv' with delimiter=',' and header=true;


