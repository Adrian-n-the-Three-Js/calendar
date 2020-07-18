const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');
const parser = require('body-parser');
const db = require('../database/index_mysql.js');
const moment = require('moment');
const cors = require('cors');
app.use(cors());

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

app.use(morgan('dev'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static('public'));


//Get  // ORINGINAL
app.get('/api/calendar/db/:hotelIdOrName', (req, res) => {
  console.log('REQUEST FROM HELP FUNC RECIEVED!');
  console.log(req.params);
  let q = req.params.hotelIdOrName;
  let parsed = parseInt(q);
  if (parsed) {
    search = {'id': q};
    console.log(search);
  } else {
    search = {'hotelName': {'$regex': q.slice(0, 1).toUpperCase() + q.slice(1)}};
  }
  db.findHotelInfo(search, (err, data) => {
    console.log('QUERY SENT');
    if (err) {
      console.log('DB QUERY ERROR', err);
      res.status(400).send();
    } else {
      console.log('DB QUERY SUCCESS');
      res.status(200).send(data);
    }
  });
});



// ORIGINAL
//  Require: RoomNumber, CheckInDate, CheckOutDate, GuestNumber
//  Pupose: Calculate approximation,
const sendResponseWithUpdatedData = (data, req, res) => {
  const checkInDate = req.query.checkIn;
  const checkOutDate = req.query.checkOut;
  const guestsNumber = req.query.guestsNumber;
  const dataItem = {};

  dataItem.maxGuestPerRoom = data.maxGuestPerRoom;//
  dataItem.roomsTotal = data.rooms;


  let roomsNumber = req.query.roomsNumber;
  let response = true;
  let newData = [...data];
  let rej = [{'err_msg': ''}];
  let totalNights;

  if (dataItem.maxGuestPerRoom < guestsNumber) {
    roomsNumber = Math.ceil(guestsNumber / dataItem.maxGuestPerRoom);
  }

  if (dataItem.roomsTotal < roomsNumber) {
    rej[0]['err_msg'] = '<over the limit of rooms available at the property>';
    response = false;
  }

  let checkInIndex;
  let checkOutIndex;
  for (let i = 0; i < dataItem.vacancy.length; i ++) {
    if (dataItem.vacancy[i].date === checkInDate) {
      checkInIndex = i;
    }
    if (dataItem.vacancy[i].date === checkOutDate) {
      checkOutIndex = i;
    }
  }
  let timeGap = dataItem.vacancy.slice(checkInIndex, checkOutIndex);
  totalNights = timeGap.length;
  for (let j = 0; j < timeGap.length; j++) {
    if (timeGap[j].isBooked) {
      rej[0]['err_msg'] += '<your dates are not available>';
      response = false;
      break;
    }
  }
  for (let k = 0; k < newData[0].prices.length; k++) {
    newData[0].prices[k].price *= totalNights * roomsNumber;
  }

  if (response) {
    res.status(200).send(newData);
  } else {
    res.status(200).send(rej);
  }
};

// Update  // ORINGINAL
app.get('/api/calendar/update/', (req, res) => {
  // db.findHotelRoomsInfo({'id': req.query.id}, (err, data) => {
  //   if (err) {
  //     console.log('DB QUERY ERROR', err);
  //   } else {
  //     console.log('DB QUERY SUCCESS');
  //     sendResponseWithUpdatedData(data, req, res);
  //   }
  // });

  let data = {};
  db.findHotelRooms({'id': req.query.id})
    .then( (result) => {
      console.log('DB QUERY SUCCESS');
      console.log(result);
      data.rooms = result.length;
      data.maxGuestPerRoom = result[0].maxGuestPerRoom;
      return db.findHotelRoomsInfo({'id': req.query.id});
    })
    .then((result) => {
      data.reservations = result;
      console.log(data);

      res.status(200).send(data);

      // sendResponseWithUpdatedData(data, req, res);
    });

});

module.exports = app;