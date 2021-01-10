// @flow
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  TIKCET_ID,
  TICKET_WIDTH,
  TICKET_HEIGHT,
} from './types';

type Props = {||};

function TicketBack() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: TICKET_WIDTH,
    height: TICKET_HEIGHT[TIKCET_ID.BACK],
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
});

export default React.memo<Props>(TicketBack);
