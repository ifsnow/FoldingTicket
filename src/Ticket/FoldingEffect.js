// @flow
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';

import TransformUtil from './TransformUtil';

import {
  TIKCET_ID,
  type TicketIdType,
} from './types';

const PERSPECTIVE = 1500;

const TRANSFORM_POSITION: {
  [TicketIdType]: number,
} = {
  [TIKCET_ID.TIME]: -100,
  [TIKCET_ID.PRICE]: -50,
  [TIKCET_ID.PAY]: -25,
};

type Props = {|
  id: TicketIdType,
  isFolded: boolean,
  onChange: (id: TicketIdType, isFolded: boolean) => mixed,
  front: React$Node,
  back: React$Node,
  children?: React$Node,
|};

function FoldingEffect({
  id,
  isFolded = false,
  onChange,
  front,
  back,
  children,
}: Props) {
  const [, setInitialized] = useState(false);
  const [isFoldedInHalf, setFoldedInHalf] = useState(true);
  const viewRef = useRef();

  const transform = useCallback((deg: number) => {
    const matrix = TransformUtil.rotateX(deg, TRANSFORM_POSITION[id], PERSPECTIVE);

    const transformStyleProp = {
      style: {
        transform: [
          {
            matrix,
          },
        ],
      },
    };

    viewRef.current?.setNativeProps(transformStyleProp);
  }, [id]);

  const fold = useMemo(() => {
    const animationValue = new Animated.Value(-180);

    const fold = (isFolding: boolean) => {
      let isHalfFolded = false;
      let isFullyFolded = false;

      animationValue.removeAllListeners();
      animationValue.addListener(({ value }) => {
        if (!isHalfFolded) {
          const isConditionOK = isFolding ? value <= -90 : value >= -90;
          if (isConditionOK) {
            isHalfFolded = true;
            setFoldedInHalf(prevValue => !prevValue);
          }
        } else if (!isFullyFolded) {
          const isConditionOK = isFolding ? value <= -180 : value >= 0;
          if (isConditionOK) {
            isFullyFolded = true;
            onChange(id, isFolding);
          }
        }

        transform(value);
      });

      Animated.timing(animationValue, {
        toValue: isFolding ? -180 : 0,
        duration: 350,
        useNativeDriver: true,
        overshootClamping: true,
      }).start();
    };

    return fold;
  }, [id, transform, onChange]);

  useEffect(() => {
    setInitialized(isInitialized => {
      if (!isInitialized) {
        transform(-180);
        return true;
      }

      fold(isFolded);
      return true;
    });
  }, [isFolded, fold, transform]);

  return (
    <Animated.View ref={viewRef}>
      <View shouldRasterizeIOS>
        {front}
        {children}
      </View>
      {isFoldedInHalf && (
        <View style={styles.back}>
          {back}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

export default React.memo<Props>(FoldingEffect);
