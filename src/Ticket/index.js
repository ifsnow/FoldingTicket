// @flow

import React, {
  useCallback,
  useState,
  useMemo,
} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';

import FoldingEffect from './FoldingEffect';
import TicketDetail from './TicketDetail';
import TicketTime from './TicketTime';
import TicketSummary from './TicketSummary';
import TicketPrice from './TicketPrice';
import TicketPay from './TicketPay';
import TicketBack from './TicketBack';

import {
  TIKCET_ID,
  TICKET_HEIGHT,
  type TicketIdType,
  type TicketDataType,
} from './types';

type Props = {|
  data: TicketDataType,
|};

type FoldedState = {
  [TicketIdType]: boolean,
};

function Ticket({ data }: Props) {
  const {
    containerStyle,
    containerSizeAnimationValue,
  } = useMemo(() => {
    const containerSizeAnimationValue = new Animated.Value(TICKET_HEIGHT.DETAIL);
    const containerStyle = {
      ...styles.container,
      height: containerSizeAnimationValue,
    };

    return {
      containerStyle,
      containerSizeAnimationValue,
    };
  }, []);

  const [, setFolded] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [foldedState, setFoldedState] = useState<FoldedState>({
    [TIKCET_ID.TIME]: true,
    [TIKCET_ID.PRICE]: true,
    [TIKCET_ID.PAY]: true,
  });

  const changeContainerSize = useCallback((...args: TicketIdType[]) => {
    const containerSize = args.reduce((acc, id) => acc + TICKET_HEIGHT[id], 0);

    Animated.timing(containerSizeAnimationValue, {
      toValue: containerSize,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [containerSizeAnimationValue]);

  const onPress = useCallback(() => {
    if (isProcessing) {
      return;
    }

    setProcessing(true);

    setFolded(isFolded => {
      const isFolding = !isFolded;

      if (isFolding) {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.PAY]: true,
        }));

        changeContainerSize(TIKCET_ID.DETAIL, TIKCET_ID.TIME, TIKCET_ID.PRICE);
      } else {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.TIME]: false,
        }));

        changeContainerSize(TIKCET_ID.DETAIL, TIKCET_ID.TIME);
      }

      return isFolding;
    });
  }, [isProcessing, changeContainerSize]);

  const onChange = useCallback((id: TicketIdType, isFolded: boolean) => {
    if (isFolded) {
      if (id === TIKCET_ID.PAY) {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.PRICE]: true,
        }));

        changeContainerSize(TIKCET_ID.DETAIL, TIKCET_ID.TIME);
      } else if (id === TIKCET_ID.PRICE) {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.TIME]: true,
        }));

        changeContainerSize(TIKCET_ID.DETAIL);
      } else {
        setProcessing(false);
      }
    } else {
      if (id === TIKCET_ID.TIME) {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.PRICE]: false,
        }));

        changeContainerSize(TIKCET_ID.DETAIL, TIKCET_ID.TIME, TIKCET_ID.PRICE);
      } else if (id === TIKCET_ID.PRICE) {
        setFoldedState(prevState => ({
          ...prevState,
          [TIKCET_ID.PAY]: false,
        }));

        changeContainerSize(TIKCET_ID.DETAIL, TIKCET_ID.TIME, TIKCET_ID.PRICE, TIKCET_ID.PAY);
      } else if (id === TIKCET_ID.PAY) {
        setProcessing(false);
      }
    }
  }, [changeContainerSize]);

  return (
    <Animated.View style={containerStyle}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.inner}>
          <TicketDetail isVisible={!foldedState.TIME} data={data} />
          <FoldingEffect
            id={TIKCET_ID.TIME}
            isFolded={foldedState.TIME}
            onChange={onChange}
            front={<TicketTime data={data} />}
            back={<TicketSummary data={data} />}
          >
            <FoldingEffect
              id={TIKCET_ID.PRICE}
              isFolded={foldedState.PRICE}
              onChange={onChange}
              front={<TicketPrice data={data} />}
              back={<TicketBack />}
            >
              <FoldingEffect
                id={TIKCET_ID.PAY}
                isFolded={foldedState.PAY}
                onChange={onChange}
                front={<TicketPay />}
                back={<TicketBack />}
              />
            </FoldingEffect>
          </FoldingEffect>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    shadowColor: '#0000000c',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
});

export default React.memo<Props>(Ticket);
