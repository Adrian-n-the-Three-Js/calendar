CREATE KEYSPACE IF NOT EXISTS hotelCalendar WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE hotelCalendar;

-- DROP TABLE IF EXISTS hotels;
-- DROP TABLE IF EXISTS hotelRooms;
-- DROP TABLE IF EXISTS roomReservations;
-- DROP TABLE IF EXISTS hotelServices;
-- DROP TABLE IF EXISTS serviceDetails;
DROP TABLE IF EXISTS services_by_room;
DROP TABLE IF EXISTS reservations_by_hotel_date;



CREATE TABLE IF NOT EXISTS reservations_by_hotel_date (
  id INT,
  hotelId INT,
  hotelName TEXT,
  roomId INT,
  maxGuest INT,
  startDate TEXT,
  endDate TEXT,
  PRIMARY KEY (hotelId, roomId, startDate)
)


CREATE TABLE IF NOT EXISTS fees_by_room (
  id INT,
  roomId INT,
  name TEXT,
  description TEXT,
  price VARINT,
  availableRoomType TEXT,
  PRIMARY KEY (roomId, price, name)
);

-- cqlsh localhost -u cassandra -p cassandra -f calendar/database/cassandra.cql
-- COPY hotelcalendar.reservations_by_hotel_date (id, hotelname, maxguest, startdate, enddate) from 'calendar/hotels.csv' with delimiter=',' and header=true;


