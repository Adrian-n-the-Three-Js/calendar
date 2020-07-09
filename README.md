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
* hotel - DB for hotel info (name, total rooms, max guest per room, etc)
* vacancy - DB for room status
* price - DB for room services

### Get info
  * GET `/api/hotel/:id`
  * GET `/api/vacancy/:id`
  * GET `/api/price/:id`

**Path Parameters:**
  * `id` id

**Success Status Code:** `200`

**Hotel - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "hotelName": "{type: String, minlength: 1, maxlength: 40}",
      "roomsTotal": "{type: Number, min: 1}",
      "maxGuestPerRoom": "{type: Number, min: 1}"
    }
```
**Vacancy - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "hotelId": "{ type: Number, required: true}",
      "date": "{ type: String, maxlength: 15 }",
      "isBooked": "{ type: Boolean, required: true }"
    }
```
**Price - Returns:** JSON

```json
    {
      "id": "{ type: Number, unique: true }",
      "hotelId": "{ type: Number, required: true }",
      "serviceName": "{ type: String, minlength: 1, maxlength: 20 }",
      "price": "{ type: Number, required: true }"
    }
```

### Add new info
  * POST `/api/hotel`
  * POST `/api/vacancy`
  * POST `/api/price`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```
The request format should follow the same format from Get/Read API response.
```

### Update info
  * PATCH `/api/hotel/:id`
  * PATCH `/api/vacancy/:id`
  * PATCH `/api/price/:id`

**Path Parameters:**
  * `id` id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    // For hotel
    {
      "id": "Number",
      "hotelName": "{type: String, minlength: 1, maxlength: 40}"
    }

    // For Vacancy
    {
      "hotelId": "Number",
      "isBooked": "Boolean"
    }

    // For Price
    {
      "hotelId": "Number",
      "price": "Number"
    }
```

### Delete info
  * DELETE `/api/hotel/:id`
  * DELETE `/api/vacancy/:id`
  * DELETE `/api/price/:id`

**Path Parameters:**
  * `id` hotel id / service id / price id

**Success Status Code:** `204`


