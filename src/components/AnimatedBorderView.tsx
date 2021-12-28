import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle, ScrollView } from 'react-native';
// import { flatten } from 'ramda';
// import { color } from "../../theme"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
// import * as Haptics from 'expo-haptics';
// const Sound = require('react-native-sound');

// Enable playback in silence mode
// Sound.setCategory('Playback');

// const CONTAINER: ViewStyle = { flex: 1 };

export interface AnimatedBorderViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  /*
  Setting to true will start the animation, setting to false will interrupt and undo (reverse) the animation.
  */
  startAnimation: Boolean;
  color?: string; // default green
  animationWidth?: number; // default 2
  animationDuration?: number; // default 1500
  /*
  Called when animation completes, will be called after an undo animation as well
  */
  animationComplete?: () => void;
}

/**
 * Describe your component here
 */
export const AnimatedBorderView = function AnimatedBorderView(
  props: AnimatedBorderViewProps
) {
  const {
    style = [],
    startAnimation,
    children,
    color = 'green',
    animationWidth = 2,
    animationDuration = 1500,
    animationComplete,
  } = props;
  const styles = style; // flatten([CONTAINER, style]);

  const offset = useSharedValue(0);
  const offsetHeight = useSharedValue(0);
  const topWidthHeight = useSharedValue(0);

  const [fullWidth, setFullWidth] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);

  const topLeftAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      width: topWidthHeight.value,
      height: animationWidth,
    };
  });
  const topAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      width: topWidthHeight.value,
      height: animationWidth,
    };
  });
  const bottomAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      height: animationWidth,
      width: offset.value,
    };
  });
  const leftAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      width: animationWidth,
      height: offsetHeight.value,
    };
  });
  const rightAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      width: animationWidth,
      height: offsetHeight.value,
    };
  });

  const wrapper = () => {
    if (animationComplete) {
      animationComplete();
    }
    // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const startAnimations = () => {
    offset.value = withTiming(
      fullWidth,
      { duration: animationDuration * 0.4, easing: Easing.ease },
      (finishedWidth: boolean | undefined) => {
        if (finishedWidth) {
          offsetHeight.value = withTiming(
            fullHeight,
            { duration: animationDuration * 0.1, easing: Easing.ease },
            (finishedHeight: boolean | undefined) => {
              if (finishedHeight) {
                topWidthHeight.value = withTiming(
                  fullWidth / 2,
                  { duration: animationDuration * 0.4, easing: Easing.ease },
                  (finishedFinal: boolean | undefined) => {
                    runOnJS(wrapper)();

                    console.log('final thing to finsihe', finishedFinal);
                  }
                );
              }
            }
          );
        }
      }
    );
  };
  const undoAnimations = () => {
    topWidthHeight.value = withTiming(
      0,
      { duration: animationDuration * 0.4, easing: Easing.ease },
      (finishedFirst: boolean | undefined) => {
        if (finishedFirst) {
          offsetHeight.value = withTiming(
            0,
            { duration: animationDuration * 0.1, easing: Easing.ease },
            (finishedFinal: boolean | undefined) => {
              if (finishedFinal) {
                offset.value = withTiming(
                  0,
                  { duration: animationDuration * 0.4, easing: Easing.ease },
                  (finishedWidth: boolean | undefined) => {
                    if (finishedWidth) {
                      runOnJS(wrapper)();

                      console.log('undo finished', finishedFinal);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );

    // offset.value = 0;
    // offsetHeight.value = 0;
    // topWidthHeight.value = 0;
  };

  useEffect(() => {
    if (startAnimation) {
      startAnimations();
    } else {
      undoAnimations();
    }
    return () => {
      //
    };
  }, [startAnimation]);

  return (
    <View style={styles}>
      {/* //flatten([styles, {}])}> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLayout={({ nativeEvent }) => {
          if (!fullWidth) {
            const newWidth = nativeEvent.layout.width;
            setFullWidth(newWidth);
          }
          if (!fullHeight) {
            const newHeight = nativeEvent.layout.height;
            setFullHeight(newHeight);
          }
        }}
      >
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 0,
          }}
        >
          <Animated.View style={topLeftAnimatedStyles} />
          <Animated.View style={topAnimatedStyles} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Animated.View style={[leftAnimatedStyles]} />

          <ScrollView
            showsHorizontalScrollIndicator
            horizontal={true}
            contentContainerStyle={{
              width: '100%',
              justifyContent: 'center',
            }}
            keyboardShouldPersistTaps={'always'}
          >
            {children}
          </ScrollView>
          <Animated.View style={rightAnimatedStyles} />
        </View>
        <Animated.View style={[bottomAnimatedStyles]} />
      </View>
    </View>
  );
};
