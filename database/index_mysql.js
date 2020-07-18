let mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'noobdev',
  password: 'post',
  database: 'hotelCalendar'
});

db.connect( (err) => {
  if (err) { throw error; }
  // db.query('SELECT * FROM hotels WHERE id < 50', (err, result, fields) => {
  //   if (err) { throw error; }
  //   console.log(result);
  // });
});


let buildQuery = ( search ) => {
  let queryString = '';
  for (let col in search) {
    queryString += ` ${col} = ${search[col]}`;
  }
  // console.log(queryString);
  return queryString;
};


db.findHotelInfo = (search, callback) => {
  const queryString = buildQuery(search);
  db.query(`SELECT * FROM hotels WHERE ${queryString}`, (err, result, fields) => {
    // console.log(result);
    callback(err, result);
  });
};

db.findHotelRooms = (q) => {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT r.id, r.maxGuestPerRoom FROM hotelRooms r inner join hotels h on (h.id = r.hotelId) WHERE h.id = ${q['id']} `, (err, result, fields) => {
      // console.log(result);
      //callback(err, result);
      resolve(result);
    });
  });
};


db.findHotelRoomsInfo = (q) => {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT b.roomId, b.id, r.maxGuestPerRoom, b.startDate, b.endDate FROM roomReservations b inner join hotelRooms r on (b.roomId = r.id) inner join hotels h on (h.id = r.hotelId) WHERE h.id = ${q['id']} `, (err, result, fields) => {
    // console.log(result);
    // callback(err, result);
      resolve(result);
    });
  });
};


module.exports = db;


/*



*/