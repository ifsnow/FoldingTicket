// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import AirlineLoading from './AirlineLoading';

import {
  TIKCET_ID,
  TICKET_WIDTH,
  TICKET_HEIGHT,
  type TicketDataType,
} from './types';

type Props = {|
  isVisible: boolean,
  data: TicketDataType,
|};

function TicketDetail({
  isVisible,
  data,
}: Props) {
  const {
    from: {
      airport: {
        code: fromAirportCode,
        name: fromAirportName,
      },
    },
    to: {
      airport: {
        code: toAirportCode,
        name: toAirportName,
      },
    },
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.labelText}>From</Text>
        <Text style={styles.codeText}>{fromAirportCode}</Text>
        <Text style={styles.nameText}>{fromAirportName}</Text>
      </View>
      <View style={styles.column}>
        <AirlineLoading isVisible={isVisible} />
      </View>
      <View style={styles.column}>
        <Text style={styles.labelText}>To</Text>
        <Text style={styles.codeText}>{toAirportCode}</Text>
        <Text style={styles.nameText}>{toAirportName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.DETAIL],
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#222',
  },
  codeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222',
  },
  nameText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#686868',
  },
});

export default React.memo<Props>(TicketDetail);
