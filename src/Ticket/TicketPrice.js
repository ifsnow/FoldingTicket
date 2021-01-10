// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
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

function TicketPrice({ data }: Props) {
  const {
    price,
    classText,
    barcode,
  } = data;

  return (
    <View style={styles.container}>
      <CuttingLine />
      <View style={styles.row}>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>{'$'}{price}</Text>
          <Text style={styles.labelText}>Price</Text>
        </View>
        <View style={styles.columnA}>
          <Text style={styles.valueText}>{classText}</Text>
          <Text style={styles.labelText}>Class</Text>
        </View>
        <View style={styles.columnB}>
          <Image source={barcode} style={styles.barcode} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.PRICE],
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  columnA: {
    flex: 3,
  },
  columnB: {
    flex: 4,
    alignItems: 'flex-end',
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
  barcode: {
    width: 98,
    height: 30,
  },
});

export default React.memo<Props>(TicketPrice);
