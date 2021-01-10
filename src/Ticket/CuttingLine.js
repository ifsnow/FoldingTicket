// @flow
import React, {
  useMemo,
  useCallback,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

type Props = {||};

function CuttingLine() {
  const [layoutWidth, setLayoutWidth] = useState(0);

  const onLayout = useCallback(event => {
    const { width } = event.nativeEvent.layout;
    if (width) {
      setLayoutWidth(width);
    }
  }, []);

  const components = useMemo(() => {
    if (layoutWidth === 0) {
      return null;
    }

    const components = [];
    const componentCount = Math.floor(layoutWidth / 7);
    for (let i = 1; i <= componentCount; i++) {
      components.push((
        <View
          key={i}
          style={styles.dotted}
        />
      ));
    }

    return components;
  }, [layoutWidth]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      {components}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 6,
    right: 6,
    flexDirection: 'row',
  },
  dotted: {
    width: 3,
    height: 1,
    marginHorizontal: 2,
    backgroundColor: '#aaa',
  },
});

export default React.memo<Props>(CuttingLine);
