const fs = require('fs');
const csvWriter = require('csv-write-stream');
// const moment = require('moment');


let writer = csvWriter();
let faker = require('faker');


const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// const totalSize = 10000000;
// const totalSize = 1000000;
// const totalSize = 100;



//1,000,000 records
//12:40:00 ~ 12:41


//1,000,000 records
//12:43:40 ~


//12:51


//1:05~  1:17? // 42%



// 500,000  //  14gb memory for WSL
//1:19 ~
//1:29 - 5118/10000
//1:36 - 58$


//14316 max size
//1:36
//1:43 - 4742
//1:48 - 7137 stopped


const newDateFormat = (date, days = 1) => {
  let d = new Date(date);
  d.setDate(d.getDate() + days);
  let month = '' + (d.getMonth() + 1);
  let day = '' + (d.getDate());
  let year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }



  return [year, month, day].join('-');
};

const reservationDateGen = () => {

  const startDate = newDateFormat(faker.date.future());
  const days = 2 + faker.random.number() % 7;
  const endDate = newDateFormat(startDate, days);

  return {startDate, endDate};
};




const dataGen = (counter = 0, totalSize = 500000) => {


  let tCounter = 0;
  const totalProgress = totalSize / 10000;
  const serviceList = ['Hotels.com', 'Expedia.com', 'Snaptravel', 'Booking.com', 'Zenhotels', 'Orbitz.com', 'Prestigia', 'Priceline', 'eDreams', 'Tripadvisor'];


  bar1.start(10000, 0);

  //Generating CSV for 'hotels' table.
  writer.pipe(fs.createWriteStream('hotels.csv'));
  for ( let i = 0; i < totalSize; i++ ) {


    // One Hotel, multiple rooms
    const totalRooms = 2 + faker.random.number() % 6;


    //Each Room, multiple reservation,
    //Each Room, different services and fees
    for (let j = 0; j < totalRooms; j++) {


      //// RESERVATION
      // # of total reservation
      const reservationTotal = 0 + faker.random.number() % 2;

      if (reservationTotal === 0) {
        writer.write({
          id: counter ++,
          hotelName: faker.company.companyName(),
          maxGuest: 1 + Math.ceil(faker.random.number() % 7),
          startDate: '',
          endDate: ''
        });
      } else {
        for ( let r = 0; r < reservationTotal; r++) {
          const reservationDate = reservationDateGen();

          //IF there is future reservation,
          writer.write({
            id: counter ++,
            hotelName: faker.company.companyName(),
            maxGuest: 1 + Math.ceil(faker.random.number() % 7),
            startDate: reservationDate.startDate,
            endDate: reservationDate.endDate
          });
        }
      }

      // //// SERVICES
      // // # of service providers
      // for ( let c = 0; c < serviceList.length; c++) {
      // }

    }



    // bar1.update(i);
    if ( i % totalProgress === 0) {
      tCounter += 1;
      bar1.increment();
      bar1.update(tCounter);
    }
  }

  bar1.stop();
  //Generating CSV for 'hotelRooms'
  //Generating CSV for 'roomReservation'
  //Generating CSV for 'hotelServices'
  //Generating CSV for 'serviceDetail'


};


dataGen();

//“COPY {tableName} ({col1Name}, {col2Name}) FROM ‘/Users/admin/sample/data.csv’ with header=true and delimiter =’,’;”







/*

10:20 am



*/