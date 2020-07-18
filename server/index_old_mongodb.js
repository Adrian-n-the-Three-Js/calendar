const express = require('express');
const app = express();
const port = 3001;
const morgan = require('morgan');
const parser = require('body-parser');
const db = require('../database/index.js');
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
  db.hotelModel.find(search, (err, data) => {
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



//// Hotel ////
//Create
app.post('/api/hotel/create', (req, res) => {

  //If no data
  if (req.body === undefined) {
    res.sendStatus(400);
  }

  console.log('CRUD - Create NEW HOTEL RECORD');
  let q = req.body;
  const newHotel = {
    id: q.id || 1,
    hotelName: q.hotelName || 'SampleHotel',
    roomsTotal: q.Number || 10,
    maxGuestPerRoom: q.Number || 10
  };

  //,
  // vacancy: [ {date: q.vacancy[0].date || '', isBooked: q.vacancy[0].isBooked || true} ],
  // prices: [ {serviceName: q.prices[0].serviceName || '', price: q.prices[0].price || 0} ]
  db.hotelModel.create(newHotel, (err, data) => {
    console.log('QUERY SENT');
    if (err) {
      console.log('Bad Create ERROR', err);
      res.status(400).send();
    } else {
      console.log('DB QUERY SUCCESS');
      res.status(201).send(data);
    }
  });
});

//Read
app.get('/api/hotel', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  db.hotelModel.find({id: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});


//Read - 2
app.get('/api/hotel/:id', (req, res) => {
  let q = req.params.id;
  let parsed = parseInt(q);
  db.hotelModel.find({id: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});

//Update
app.patch('/api/hotel', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  const name = req.body.name;
  // db.hotelModel.
  console.log('update = ', parsed, ' / ', name);
  db.hotelModel.findOneAndUpdate({id: parsed}, {hotelName: name})
    .then( (result)=> res.status(204).send('Update Completed'))
    .catch( (e)=> res.status(400).send('Bad Update Request: ', e));
});

//Delete
app.delete('/api/hotel/:id', (req, res) => {
  let q = req.params.id;
  let parsed = parseInt(q);
  db.hotelModel.deleteOne({id: parsed})
    .then( ()=> res.status(204).send('Delete Completed'))
    .catch( (e)=> res.status(400).send('Bad Delete Request: ', e));
});






//// Vacancy ////
//Create
app.post('/api/vacancy', (req, res) => {

  //If no data
  if (req.body === undefined) {
    res.sendStatus(400);
  }

  console.log('CRUD - Create NEW HOTEL RECORD');
  let q = req.body;
  const newRoom = {
    id: q.id || 1,
    hotelId: q.hotelId || 1,
    date: q.date || 'Funny Today',
    isBooked: q.isBooked || true
  };

  db.vacancyModel.create(newRoom, (err, data) => {
    console.log('QUERY SENT - Vacancy');
    if (err) {
      console.log('Bad Create ERROR', err);
      res.status(400).send();
    } else {
      console.log('DB QUERY SUCCESS');
      res.status(201).send(data);
    }
  });
});

//Read
app.get('/api/vacancy', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  db.vacancyModel.find({hotelId: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});


//Read - 2
app.get('/api/vacancy/:id', (req, res) => {
  let q = req.params.id;
  let parsed = parseInt(q);
  db.vacancyModel.find({id: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});

//Update
app.patch('/api/vacancy', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  const name = req.body.name;
  // db.hotelModel.
  console.log('update = ', parsed, ' / ', name);
  db.vacancyModel.findOneAndUpdate({hotelId: parsed}, {isBooked: true})
    .then( (result)=> res.status(204).send('Update Completed ' + result))
    .catch( (e)=> res.status(400).send('Bad Update Request: ', e));
});

//Delete
app.delete('/api/vacancy/:id', (req, res) => {
  let q = req.params.id;
  let parsed = parseInt(q);
  db.hotelModel.deleteOne({id: parsed})
    .then( ()=> res.status(204).send('Delete Completed'))
    .catch( (e)=> res.status(400).send('Bad Delete Request: ', e));
});




//// Price ////
//Create
app.post('/api/price', (req, res) => {

  //If no data
  if (req.body === undefined) {
    res.sendStatus(400);
  }

  console.log('CRUD - Create NEW Price RECORD');
  let q = req.body;
  const newService = {
    id: q.id || 1,
    hotelId: q.hotelId || 1,
    serviceName: q.serviceName || 'Free Service',
    price: q.price || 0
  };

  db.priceModel.create(newService, (err, data) => {
    console.log('QUERY SENT - Vacancy');
    if (err) {
      console.log('Bad Create ERROR', err);
      res.status(400).send();
    } else {
      console.log('DB QUERY SUCCESS');
      res.status(201).send(data);
    }
  });
});

//Read
app.get('/api/price', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  db.priceModel.find({hotelId: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});


//Read - 2
app.get('/api/price/:id', (req, res) => {
  let q = req.params.id;
  let parsed = parseInt(q);
  db.priceModel.find({id: parsed})
    .then( (d)=> res.status(200).send(d))
    .catch( (e)=> res.status(400).send('Bad Read Request: ', e));
});

//Update
app.patch('/api/price', (req, res) => {
  //If no data
  if (req.body === undefined) {
    res.status(400).send('Bad Request');
  }

  let q = req.body.id;
  let parsed = parseInt(q);
  const name = req.body.name;
  // db.hotelModel.
  console.log('update = ', parsed, ' / ', name);
  db.priceModel.findOneAndUpdate({hotelId: parsed}, {price: 100})
    .then( (result)=> res.status(204).send('Update Completed ' + result))
    .catch( (e)=> res.status(400).send('Bad Update Request: ', e));
});

//Delete
app.delete('/api/price/:id', (req, res) => {
  let q = req.body.id;
  let parsed = parseInt(q);
  db.priceModel.deleteOne({id: parsed})
    .then( ()=> res.status(204).send('Delete Completed'))
    .catch( (e)=> res.status(400).send('Bad Delete Request: ', e));
});






// ORIGINAL
//  Require: RoomNumber, CheckInDate, CheckOutDate, GuestNumber
//  Pupose: Calculate approximation,
const sendResponseWithUpdatedData = (data, req, res) => {
  const checkInDate = req.query.checkIn;
  const checkOutDate = req.query.checkOut;
  const guestsNumber = req.query.guestsNumber;
  const dataItem = data[0];
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
  db.hotelModel.find({'id': req.query.id}, (err, data) => {
    if (err) {
      console.log('DB QUERY ERROR', err);
    } else {
      console.log('DB QUERY SUCCESS');
      sendResponseWithUpdatedData(data, req, res);
    }
  });
});

module.exports = app;