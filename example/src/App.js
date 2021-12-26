import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { AnimatedBorderView } from 'react-native-animated-border';
export default function App() {
    // const [result, setResult] = React.useState<number | undefined>();
    const [ready, setReady] = useState(false);
    return (React.createElement(View, { style: styles.container },
        React.createElement(AnimatedBorderView, { startAnimation: ready, style: styles.box, children: React.createElement(Text, { style: { textAlign: 'center', margin: 10 } }, "Testing ") }),
        React.createElement(Button, { title: "Animate", onPress: () => {
                setReady(true);
            } })));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 120,
        height: 60,
        // margin: 100,
    },
});
