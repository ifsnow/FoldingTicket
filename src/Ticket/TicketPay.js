// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import {
  TIKCET_ID,
  TICKET_WIDTH,
  TICKET_HEIGHT,
} from './types';

import CuttingLine from './CuttingLine';

type Props = {||};

function TicketPay() {
  return (
    <View style={styles.container}>
      <CuttingLine />
      <View style={styles.button}>
        <Text style={styles.buttonText}>Pay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.PAY],
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#0d1c53',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0d1c53',
  },
});

export default React.memo<Props>(TicketPay);
