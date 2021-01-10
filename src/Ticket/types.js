// @flow

export const TIKCET_ID = {
  DETAIL: 'DETAIL',
  TIME: 'TIME',
  PRICE: 'PRICE',
  PAY: 'PAY',
  BACK: 'BACK',
  SUMMARY: 'SUMMARY',
};

export type TicketIdType = $Keys<typeof TIKCET_ID>;

export const TICKET_WIDTH = 320;

export const TICKET_HEIGHT = {
  [TIKCET_ID.DETAIL]: 100,
  [TIKCET_ID.TIME]: 100,
  [TIKCET_ID.PRICE]: 50,
  [TIKCET_ID.PAY]: 50,
  [TIKCET_ID.BACK]: 50,
  [TIKCET_ID.SUMMARY]: 101,
};

export type AirportType = {
  code: string,
  name: string,
};

export type TicketDataType = {
  from: {
    airport: AirportType,
    city: string,
    date: string,
    time: string,
  },
  to: {
    airport: AirportType,
    city: string,
    date: string,
    time: string,
  },
  duration: string,
  boarding: string,
  gate: string,
  seat: string,
  airlineLogo: any,
  airlineLogoSize: {
    width: number,
    height: number,
  },
  price: number,
  classText: string,
  barcode: any,
};
