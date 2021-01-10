// @flow
import { type TicketDataType } from '~/Ticket/types';

const Tickets: TicketDataType[] = [
  {
    from: {
      airport: {
        code: 'BLR',
        name: 'Kempegowda International',
      },
      city: 'Bengaluru',
      date: 'June 12',
      time: '6:20',
    },
    to: {
      airport: {
        code: 'DEL',
        name: 'Indira Gandhi International',
      },
      city: 'New Delhi',
      date: 'June 12',
      time: '8:45',
    },
    duration: '2h 25min',
    boarding: '5:35',
    gate: '8',
    seat: '20A',
    airlineLogo: require('./assets/airline-qatar.png'),
    airlineLogoSize: {
      width: 92,
      height: 26,
    },
    price: 100,
    classText: 'Economy',
    barcode: require('./assets/barcode.png'),
  },
  {
    from: {
      airport: {
        code: 'BLR',
        name: 'Kempegowda International',
      },
      city: 'Bengaluru',
      date: 'June 12',
      time: '6:20',
    },
    to: {
      airport: {
        code: 'DEL',
        name: 'Indira Gandhi International',
      },
      city: 'New Delhi',
      date: 'June 12',
      time: '8:45',
    },
    duration: '2h 25min',
    boarding: '5:35',
    gate: '8',
    seat: '20A',
    airlineLogo: require('./assets/airline-swiss.png'),
    airlineLogoSize: {
      width: 96,
      height: 22,
    },
    price: 100,
    classText: 'Economy',
    barcode: require('./assets/barcode.png'),
  },
];

export default Tickets;
