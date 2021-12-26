import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
// import { flatten } from 'ramda';
// import { color } from "../../theme"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS, } from 'react-native-reanimated';
// import * as Haptics from 'expo-haptics';
// const Sound = require('react-native-sound');
// Enable playback in silence mode
// Sound.setCategory('Playback');
const FILLCOLOR = 'green'; //color.palette.green
const ANIMATION_WIDTH = 2;
const ANIMATION_DURATION = 1500;
/**
 * Describe your component here
 */
export const AnimatedBorderView = function AnimatedBorderView(props) {
    const { style = [], startAnimation, children } = props;
    const styles = style; // flatten([CONTAINER, style]);
    const offset = useSharedValue(0);
    const offsetHeight = useSharedValue(0);
    const topWidthHeight = useSharedValue(0);
    const [fullWidth, setFullWidth] = useState(0);
    const [fullHeight, setFullHeight] = useState(0);
    const topLeftAnimatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: FILLCOLOR,
            width: topWidthHeight.value,
            height: ANIMATION_WIDTH,
        };
    });
    const topAnimatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: FILLCOLOR,
            width: topWidthHeight.value,
            height: ANIMATION_WIDTH,
        };
    });
    const bottomAnimatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: FILLCOLOR,
            height: ANIMATION_WIDTH,
            width: offset.value,
        };
    });
    const leftAnimatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: FILLCOLOR,
            width: ANIMATION_WIDTH,
            height: offsetHeight.value,
        };
    });
    const rightAnimatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: FILLCOLOR,
            width: ANIMATION_WIDTH,
            height: offsetHeight.value,
        };
    });
    const wrapper = () => {
        // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        playSound();
    };
    const startAnimations = () => {
        offset.value = withTiming(fullWidth, { duration: ANIMATION_DURATION * 0.4, easing: Easing.ease }, (finishedWidth) => {
            if (finishedWidth) {
                offsetHeight.value = withTiming(fullHeight, { duration: ANIMATION_DURATION * 0.1, easing: Easing.ease }, (finishedHeight) => {
                    if (finishedHeight) {
                        topWidthHeight.value = withTiming(fullWidth / 2, { duration: ANIMATION_DURATION * 0.4, easing: Easing.ease }, (finishedFinal) => {
                            runOnJS(wrapper)();
                            console.log('final thing to finsihe', finishedFinal);
                        });
                    }
                });
            }
        });
    };
    const undoAnimations = () => {
        offset.value = 0;
        offsetHeight.value = 0;
        topWidthHeight.value = 0;
    };
    function playSound() {
        // var whoosh = new Sound(
        //   'completetask.mp3',
        //   Sound.MAIN_BUNDLE,
        //   (error: any) => {
        //     if (error) {
        //       console.warn('failed to load the sound', error);
        //       return;
        //     }
        //     // Play the sound with an onEnd callback
        //     whoosh.play((success: boolean) => {
        //       if (success) {
        //         console.warn('successfully finished playing');
        //       } else {
        //         console.warn('playback failed due to audio decoding errors');
        //       }
        //     });
        //   }
        // );
    }
    useEffect(() => {
        if (startAnimation) {
            startAnimations();
            console.log('is completed', startAnimation);
        }
        else {
            undoAnimations();
        }
        return () => {
            //
        };
    }, [startAnimation]);
    return (React.createElement(View, { style: styles },
        React.createElement(View, { style: {
                alignItems: 'center',
                justifyContent: 'center',
            }, onLayout: ({ nativeEvent }) => {
                if (!fullWidth) {
                    const newWidth = nativeEvent.layout.width;
                    setFullWidth(newWidth);
                }
                if (!fullHeight) {
                    const newHeight = nativeEvent.layout.height;
                    setFullHeight(newHeight);
                }
            } },
            React.createElement(View, { style: {
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: 0,
                } },
                React.createElement(Animated.View, { style: topLeftAnimatedStyles }),
                React.createElement(Animated.View, { style: topAnimatedStyles })),
            React.createElement(View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                } },
                React.createElement(Animated.View, { style: [leftAnimatedStyles] }),
                React.createElement(ScrollView, { showsHorizontalScrollIndicator: true, horizontal: true, contentContainerStyle: {
                        width: '100%',
                        justifyContent: 'center',
                    }, keyboardShouldPersistTaps: 'always' }, children),
                React.createElement(Animated.View, { style: [rightAnimatedStyles] })),
            React.createElement(Animated.View, { style: [bottomAnimatedStyles] }))));
};
