const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
//database
// 172.17.0.2
// mongoose.connect('mongodb://172.17.0.2/hotellist', option)
mongoose.connect('mongodb://localhost:27017/hotellist', option)
  .then((result)=>{
    console.log('DB CONNECT');
  })
  .catch((err)=>{
    console.log('UNABLE TO CONNECT');
  });

const db = mongoose.connection;

//Test connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DATABASE CONNECTED!');
});
//

const hotelSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  hotelName: {type: String, minlength: 1, maxlength: 40},
  roomsTotal: {type: Number, min: 1},
  maxGuestPerRoom: {type: Number, min: 1}
});

const vacancySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  hotelId: { type: Number, required: true},
  date: { type: String, maxlength: 15 },
  isBooked: { type: Boolean, required: true }
});

const priceSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  hotelId: { type: Number, required: true },
  serviceName: { type: String, minlength: 1, maxlength: 20 },
  price: { type: Number, required: true }
});



const HotelClass = mongoose.model('hotels', hotelSchema);
const VacancyClass = mongoose.model('vacancies', vacancySchema);
const PriceClass = mongoose.model('prices', priceSchema);


module.exports.hotelModel = HotelClass;
module.exports.vacancyModel = VacancyClass;
module.exports.priceModel = PriceClass;

module.exports.connection = db;

