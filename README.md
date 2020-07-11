# Hotellooo / Calendar

> Calendar component for Hetellooo Web Application

## Related Projects

  - https://github.com/Hotellooo/calendar
  - https://github.com/Hotellooo/photos-carousel
  - https://github.com/Hotellooo/reviews
  - https://github.com/Hotellooo/about

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [ServerAPI](#Server-API)

## Usage

> run 'npm start'

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

Need to install 'MongoDB' and run the service online

In Linux( or WSL)
```sh
 sudo apt-get install mongodb
 sudo service mongodb start
```
## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


### Seeding database

```sh
npm run db-seed
```



## Server API

### General Format for CRUD

* POST `/api/[dbName]`
* GET `/api/[dbName]/:id`
* PATCH `/api/[dbName]`
* DELETE `/api/[dbName]/:id`

#### list of DBs
* hotels - DB for hotel info (name, total rooms, max guest per room, etc)
* hotelRooms - DB for Rooms ( type of room, and is it booked or bookable )
* roomReservation - DB for Reservation information about the specific room
* hotelServices - DB for Room Services available at the specific hotel
* serviceDetails - DB for serviceAvailability based on roomType

### Get info
  * GET `/api/hotel/:id`
  * GET `/api/hotelRoom/:id`
  * GET `/api/roomReservation/:id`
  * GET `/api/hotelService/:id`
  * GET `/api/serviceDetail/:id`

**Path Parameters:**
  * `id` id

**Success Status Code:** `200`

**Hotel - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "name": "{type: String, minlength: 1, maxlength: 40}",
      "roomsTotal": "{type: Number, min: 1}"
    }
```
**Room - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "hotelId": "{ type: Number, required: true}",
      "roomType": "{ type: String, maxlength: 30 }",
      "maxGuestPerRoom": "{type: Number, min: 1}",
      "isBooked": "{ type: Boolean, required: true, default: false }",
      "isBookable": "{ type: Boolean, required: true, default: true }"
    }
```
**Reservation - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "roomId": "{ type: Number, required: true}",
      "startDate": "{ type: String, maxlength: 30 }",
      "endDate": "{ type: String, maxlength: 30 }"
    }
```
**Service - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "hotelId": "{ type: Number, required: true }",
      "name": "{ type: String, default: '', maxlength: 30 }",
      "description": "{ type: String, default: '', maxlength: 250 }",
      "price": "{ type: Number, default: 0}"
    }
```
**ServiceDetail - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "serviceId": "{ type: Number, required: true }",
      "availableRoomType": "{ type: String, default: '', maxlength: 50 }"
    }
```
### Add new info
  * POST `/api/hotel`
  * POST `/api/hotelRoom`
  * POST `/api/roomReservation`
  * POST `/api/hotelService`
  * POST `/api/serviceDetail`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```
The request format should follow the same format from Get/Read API response.
```

### Update info
  * PATCH `/api/hotel/:id`
  * PATCH `/api/hotelRoom/:id`
  * PATCH `/api/roomReservation/:id`
  * PATCH `/api/hotelService/:id`
  * PATCH `/api/serviceDetail/:id`

**Path Parameters:**
  * `id` id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    // For hotel
    {
      "id": "Number",
      "hotelName": "{type: String, maxlength: 50}",
      "roomsTotal": "Number"
    }

    // For hotelRoom
    {
      "roomId": "Number",
      "roomType":"String",
      "maxGuestPerRoom":"Number",
      "isBookable": "Boolean"
    }

    // For roomReservation
    {
      "reserveId": "Number",
      "startDate":"String",
      "endDate":"String"
    }

    // For hotelService
    {
      "hotelId": "Number",
      "name": "String",
      "description":"String",
      "price": "Number"
    }

    // For serviceDetail
    {
      "serviceId": "Number",
      "availableRoomType": "String"
    }

```

### Delete info
  * DELETE `/api/hotel/:id`
  * DELETE `/api/hotelRoom/:id`
  * DELETE `/api/roomReservation/:id`
  * DELETE `/api/hotelService/:id`
  * DELETE `/api/serviceDetail/:id`


**Path Parameters:**
  * `id` id

**Success Status Code:** `204`


