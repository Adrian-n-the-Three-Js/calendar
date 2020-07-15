const fs = require('fs');
const csvWriter = require('csv-write-stream');
// const moment = require('moment');


let faker = require('faker');


const cliProgress = require('cli-progress');
let counter = 0;


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




const dataGen = (fileNum = 0, startNum = 0, totalSize = 1000000) => {

  counter = startNum;


  let writer = csvWriter();
  let tCounter = 0;
  const totalProgress = totalSize / 10000;
  const serviceList = ['Hotels.com', 'Expedia.com', 'Snaptravel', 'Booking.com', 'Zenhotels', 'Orbitz.com', 'Prestigia', 'Priceline', 'eDreams', 'Tripadvisor'];


  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);

  //Generating CSV for 'hotels' table.
  writer.pipe(fs.createWriteStream(`hotels_${fileNum}.csv`));

  //https://stackoverflow.com/questions/40948879/append-to-a-csv-file-in-nodejs-using-csv-write-stream
  //writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}))


  for ( let i = 0; i < totalSize; i++ ) {


    // One Hotel, multiple rooms
    const totalRooms = 2 + faker.random.number() % 8;


    //Each Room, multiple reservation,
    //Each Room, different services and fees
    for (let j = 0; j < totalRooms; j++) {


      //// RESERVATION
      // # of total reservation
      const reservationTotal = faker.random.number() % 5;

      if (reservationTotal === 0) {
        writer.write({
          id: counter ++,
          hotelName: faker.company.companyName(),
          maxGuest: 1 + Math.ceil(faker.random.number() % 7),
          startDate: 'none',
          endDate: 'none'
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
      // writer.end();
      tCounter += 1;
      bar1.increment();
      bar1.update(tCounter);
      // writer = csvWriter({sendHeaders: false});
      // writer.pipe(fs.createWriteStream('hotels.csv', {flags: 'a'}));
    }
  }
  writer.end();
  bar1.stop();
  //Generating CSV for 'hotelRooms'
  //Generating CSV for 'roomReservation'
  //Generating CSV for 'hotelServices'
  //Generating CSV for 'serviceDetail'


};


//dataGen(0); //3 37 14 - 3:43
// dataGen(1, 12103454);
// dataGen(2, 24207504);
// dataGen(3, 36297776);
// dataGen(4, 48388260);

// dataGen(5, 60488382);

// dataGen(6, 12103454);
// dataGen(7, 12103454);
// dataGen(8, 12103454);
// dataGen(9, 12103454);



//“COPY {tableName} ({col1Name}, {col2Name}) FROM ‘/Users/admin/sample/data.csv’ with header=true and delimiter =’,’;”






const writeReservation = fs.createWriteStream('reservations_5.csv');//, {flags: 'a'});
writeReservation.write('id,hotelName,maxGuest,startDate,endDate\n', 'utf8');
let writeTenMillionUsers = (writer, encoding, callback) => {
  let i = 1000000;
  let id = 60498258 + 1;

  let tCounter = 0;
  const totalProgress = i / 10000;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);

  let write = () => {
    let ok = true;
    do {
      i -= 1;
      const hotelName = '"' + faker.company.companyName() + '"';
      const totalRooms = 2 + faker.random.number() % 8;
      for (let j = 0; j < totalRooms; j++) {
        const maxGuest = 1 + faker.random.number() % 7;
        const reservationTotal = faker.random.number() % 5;
        if (reservationTotal === 0) {
          const startDate = 'none';
          const endDate = 'none';
          const data = `${id++},${hotelName},${maxGuest},${startDate},${endDate}\n`;
          ok = writer.write(data, encoding);
          if (!ok) { writer.once('drain', write); ok = true; }
        } else {
          for ( let r = 0; r < reservationTotal; r++) {
            const reservationDate = reservationDateGen();
            const startDate = reservationDate.startDate;
            const endDate = reservationDate.endDate;
            const data = `${id++},${hotelName},${maxGuest},${startDate},${endDate}\n`;
            ok = writer.write(data, encoding);
            if (!ok) { writer.once('drain', write); ok = true; }
          }
        }
      }
      if ( i % totalProgress === 0) {
        tCounter += 1;
        bar1.update(tCounter);
      }
    } while (i > 0);

    writer.end();
    bar1.stop();
  };

  write();
};

// process.setMaxListeners(0);
require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 15;

writeTenMillionUsers(writeReservation, 'utf-8', () => {
  writeUsers.end();
});

/*
  for ( let i = 0; i < totalSize; i++ ) {


    // One Hotel, multiple rooms
    const totalRooms = 2 + faker.random.number() % 8;


    //Each Room, multiple reservation,
    //Each Room, different services and fees
    for (let j = 0; j < totalRooms; j++) {


      //// RESERVATION
      // # of total reservation
      const reservationTotal = faker.random.number() % 5;

      if (reservationTotal === 0) {
        writer.write({
          id: counter ++,
          hotelName: faker.company.companyName(),
          maxGuest: 1 + Math.ceil(faker.random.number() % 7),
          startDate: 'none',
          endDate: 'none'
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

writeTenMillionUsers(writeReservation, 'utf-8', () => {
  writeUsers.end();
});
*/




/*

10:20 am



*/















// const dataGen = (fileNum = 0, startNum = 0, totalSize = 1000000) => {

//   counter = startNum;

//   let writer = csvWriter();
//   let tCounter = 0;
//   const totalProgress = totalSize / 10000;
//   const serviceList = ['Hotels.com', 'Expedia.com', 'Snaptravel', 'Booking.com', 'Zenhotels', 'Orbitz.com', 'Prestigia', 'Priceline', 'eDreams', 'Tripadvisor'];


//   const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
//   bar1.start(10000, 0);

//   //Generating CSV for 'hotels' table.
//   writer.pipe(fs.createWriteStream(`hotels_${fileNum}.csv`));

//   //https://stackoverflow.com/questions/40948879/append-to-a-csv-file-in-nodejs-using-csv-write-stream
//   //writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'}))


//   for ( let i = 0; i < totalSize; i++ ) {


//     // One Hotel, multiple rooms
//     const totalRooms = 2 + faker.random.number() % 8;


//     //Each Room, multiple reservation,
//     //Each Room, different services and fees
//     for (let j = 0; j < totalRooms; j++) {


//       //// RESERVATION
//       // # of total reservation
//       const reservationTotal = faker.random.number() % 5;

//       if (reservationTotal === 0) {
//         writer.write({
//           id: counter ++,
//           hotelName: faker.company.companyName(),
//           maxGuest: 1 + Math.ceil(faker.random.number() % 7),
//           startDate: 'none',
//           endDate: 'none'
//         });
//       } else {
//         for ( let r = 0; r < reservationTotal; r++) {
//           const reservationDate = reservationDateGen();

//           //IF there is future reservation,
//           writer.write({
//             id: counter ++,
//             hotelName: faker.company.companyName(),
//             maxGuest: 1 + Math.ceil(faker.random.number() % 7),
//             startDate: reservationDate.startDate,
//             endDate: reservationDate.endDate
//           });
//         }
//       }

//       // //// SERVICES
//       // // # of service providers
//       // for ( let c = 0; c < serviceList.length; c++) {
//       // }

//     }


//     // bar1.update(i);
//     if ( i % totalProgress === 0) {
//       // writer.end();
//       tCounter += 1;
//       bar1.increment();
//       bar1.update(tCounter);
//       // writer = csvWriter({sendHeaders: false});
//       // writer.pipe(fs.createWriteStream('hotels.csv', {flags: 'a'}));
//     }
//   }
//   writer.end();
//   bar1.stop();
//   //Generating CSV for 'hotelRooms'
//   //Generating CSV for 'roomReservation'
//   //Generating CSV for 'hotelServices'
//   //Generating CSV for 'serviceDetail'

// };





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

//8~12 gig


//half million
//2:23
//2:24
