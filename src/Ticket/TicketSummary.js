// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import {
  TIKCET_ID,
  TICKET_WIDTH,
  TICKET_HEIGHT,
  type TicketDataType,
} from './types';

type Props = {|
  data: TicketDataType,
|};

function TicketSummary({ data }: Props) {
  const {
    airlineLogo,
    airlineLogoSize,
    from: {
      city: fromCity,
      date: fromDate,
      time: fromTime,
    },
    to: {
      city: toCity,
      date: toDate,
      time: toTime,
    },
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.columnA}>
        <Image source={airlineLogo} style={(airlineLogoSize: any)} />
      </View>
      <View style={styles.columnB}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cityText}>{fromCity}</Text>
            <Text style={styles.timeText}>{fromTime}</Text>
            <Text style={styles.dateText}>{fromDate}</Text>
          </View>
          <View>
            <Image source={require('./assets/airplane.png')} style={styles.airplane} />
          </View>
          <View style={styles.column}>
            <Text style={styles.cityText}>{toCity}</Text>
            <Text style={styles.timeText}>{toTime}</Text>
            <Text style={styles.dateText}>{toDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.SUMMARY],
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    transform: [{ scaleY: -1 }],
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnA: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnB: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 10,
    color: '#686868',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginTop: 2,
  },
  dateText: {
    fontSize: 10,
    color: '#686868',
    marginTop: 5,
  },
  airplane: {
    width: 30,
    height: 26,
  },
});

export default React.memo<Props>(TicketSummary);
