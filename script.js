
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  // stages: [
  //   { duration: '1s', target: 1000 }
  // ]

  // vus: 50,
  // duration: '1m'

  vus: 1000,
  duration: '1s'
};

export default function() {
  const hotelId = Math.floor(Math.random() * 99999999) + 1;
  http.get(`http://localhost:3001/api/calendar/db/${hotelId}`);
  sleep(1);
}