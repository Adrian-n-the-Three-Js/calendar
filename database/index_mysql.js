let mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'noobdev',
  password: 'post',
  database: 'hotelDB'
});

db.connect( (err) => {
  if (err) { throw error; }
  db.query('SELECT * FROM students', (err, result, fields) => {
    if (err) { throw error; }
    console.log(result);
  });
});