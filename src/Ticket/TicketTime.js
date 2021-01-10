// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import CuttingLine from './CuttingLine';

import {
  TIKCET_ID,
  TICKET_WIDTH,
  TICKET_HEIGHT,
  type TicketDataType,
} from './types';

type Props = {|
  data: TicketDataType,
|};

function TicketTime({ data }: Props) {
  const {
    from: {
      time: fromTime,
    },
    to: {
      time: toTime,
    },
    duration,
    boarding,
    gate,
    seat,
  } = data;

  return (
    <View style={styles.container}>
      <CuttingLine />
      <View style={styles.row}>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>{fromTime} - {toTime}</Text>
          <Text style={styles.labelText}>Flight Time</Text>
        </View>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>{duration}</Text>
          <Text style={styles.labelText}>Duration</Text>
        </View>
        <View style={styles.columnB}>
          <Text style={styles.valueText}>{boarding}</Text>
          <Text style={styles.labelText}>Boarding</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>No</Text>
          <Text style={styles.labelText}>Transfer</Text>
        </View>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>{gate}</Text>
          <Text style={styles.labelText}>Gate</Text>
        </View>
        <View style={styles.columnB}>
          <Text style={styles.valueText}>{seat}</Text>
          <Text style={styles.labelText}>Seat</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.TIME],
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  columnA: {
    flex: 4,
  },
  columnB: {
    flex: 2,
  },
  row2: {
    flexDirection: 'row',
    marginTop: 8,
  },
  labelText: {
    fontSize: 10,
    color: '#686868',
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#222',
  },
});

export default React.memo<Props>(TicketTime);
