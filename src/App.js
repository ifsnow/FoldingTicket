// @flow

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import Ticket from '~/Ticket';

import TicketData from './DummyData';

const App = () => {
  const ticketComponents = TicketData.map((data, index) => <Ticket key={index} data={data} />);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        {ticketComponents}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingTop: 90,
    alignItems: 'center',
  },
});

export default App;
