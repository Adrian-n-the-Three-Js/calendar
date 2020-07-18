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





//“COPY {tableName} ({col1Name}, {col2Name}) FROM ‘/Users/admin/sample/data.csv’ with header=true and delimiter =’,’;”





const process = require('events');
process.EventEmitter.prototype._maxListeners = 100;
process.EventEmitter.defaultMaxListeners = 90;
// process.setMaxListeners(20);



let writeOneMillionHotels = (writer, encoding, id) => {
  let i = 10000000;
  // let id = 1000000;
  let tCounter = 0;
  const totalProgress = i / 10000;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);
  let write = () => {
    let ok = true;
    do {
      i -= 1;
      const hotelName = '"' + faker.company.companyName() + '"';
      const rooms = 10;//faker.randome.number()%5 + 1;
      const data = `${id++},${hotelName},${rooms}\n`;
      ok = writer.write(data, encoding);
      if (!ok) { writer.once('drain', write); ok = true; }
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
// ////WRITE HOTELS
// let writeHotel = fs.createWriteStream('hotels.csv');//, {flags: 'a'});
// writeHotel.write('id,name,roomsTotal\n', 'utf8');
// writeOneMillionHotels(writeHotel, 'utf-8', 0);




let writeOneMillionRooms = (writer, encoding, id) => {
  let i = 2000000;
  // let id = 1000000;
  let tCounter = 0;
  let hotelId = id;
  let roomId = hotelId * 10;

  const totalProgress = i / 10000;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);
  let write = () => {
    let ok = true;
    do {
      i -= 1;
      const roomType = '1Room';
      const maxGuestPerRoom = faker.random.number()%6 + 1;
      for (let j = 0; j < 10; j++) {
        const data = `${roomId++},${hotelId},${roomType},${maxGuestPerRoom}\n`;
        ok = writer.write(data, encoding);
        if (!ok) { writer.once('drain', write); ok = true; }
      }
      hotelId ++;

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
// ////WRITE HOTELROOMS
let number = 4; // 0~4;
let writeRoom = fs.createWriteStream(`hotelRooms_${number}.csv`);//, {flags: 'a'});
writeRoom.write('id,hotelId,roomType,maxGuestPerRoom\n', 'utf8');
writeOneMillionRooms(writeRoom, 'utf-8', 2000000 * number);









let writeOneMillionReservations = (writer, encoding, hotelId = 0, callback) => {
  let i = 0;
  let limit = 1000000;
  let tCounter = 0;

  // let id = 0;
  let id = 198006776 + 1;

  const totalProgress = limit / 10000;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);
  let write = () => {
    let ok = true;
    do {
      const totalRooms = 10; //5 + faker.random.number() % 16;
      for (let j = 0; j < totalRooms; j++) {
        const reservationTotal = faker.random.number() % 5;
        if (reservationTotal === 0) {
          const startDate = 'none';
          const endDate = 'none';
          if (!ok) { writer.once('drain', write); ok = true; }
        } else {
          for ( let r = 0; r < reservationTotal; r++) {
            const reservationDate = reservationDateGen();
            const startDate = reservationDate.startDate;
            const endDate = reservationDate.endDate;
            const data = `${id++},${hotelId * 10 + j},${startDate},${endDate}\n`;
            ok = writer.write(data, encoding);
            if (!ok) { writer.once('drain', write); ok = true; }
          }
        }
      }
      i ++;
      hotelId ++;
      if ( i % totalProgress === 0) {
        tCounter += 1;
        bar1.update(tCounter);
      }
    } while (i < limit);

    writer.end();
    bar1.stop();
  };
  write();
};
// ////WRITE RESERVATIONS
// let number = 9; //  0~9
// const writeReservation = fs.createWriteStream(`reservations_${number}.csv`);//, {flags: 'a'});
// writeReservation.write('id,roomId,startDate,endDate\n', 'utf8');
// writeOneMillionReservations(writeReservation, 'utf-8', number * (1000000), () => {
//   writeReservation.end();
// });





let writeOneMillionPricelist = (writer, encoding, hotelId = 0, callback) => {
  // let id = 0;
  let lastIndex = 0;
  let id = lastIndex + 1;
  let i = 0;
  let limit = 5000000;
  const serviceList = ['Tripadvisor', 'Hotels.com', 'Expedia.com', 'Snaptravel', 'Booking.com', 'Zenhotels', 'Orbitz.com', 'Prestigia', 'Priceline', 'eDreams'];
  let tCounter = 0;
  const totalProgress = limit / 10000;
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(10000, 0);

  let write = () => {
    let ok = true;
    do {
      for (let j = 0; j < serviceList.length; j++) {
        if (faker.random.boolean() || j === 0 ) {
          const name = serviceList[j];
          const priceAdult = faker.commerce.price();
          const priceKid = faker.commerce.price();
          const data = `${hotelId},${priceAdult},${priceKid},${name}\n`;
          ok = writer.write(data, encoding);
          if (!ok) { writer.once('drain', write); ok = true; }
        }
      }
      i ++;
      hotelId ++;
      if ( i % totalProgress === 0) {
        tCounter += 1;
        bar1.update(tCounter);
      }
    } while (i < limit);
    writer.end();
    bar1.stop();
  };
  write();
};


////WRITE PRICELIST
// let number = 1; //  0~1
// const writePricelist = fs.createWriteStream(`pricelist_${number}.csv`);//, {flags: 'a'});
// writePricelist.write('roomId,name,price\n', 'utf8');
// writeOneMillionPricelist(writePricelist, 'utf-8', 5000000 * number,() => {
//   writePricelist.end();
// });

//*/

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



/*

mysql

reservations_1.csv 3:22 - 3:36(~)
3 36 - 3 50
3 50 -
*/


/*



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


*/