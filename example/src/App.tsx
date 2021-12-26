import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { AnimatedBorderView } from 'react-native-animated-border';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();
  const [ready, setReady] = useState(false);

  return (
    <View style={styles.container}>
      <AnimatedBorderView
        startAnimation={ready}
        style={styles.box}
        children={
          <Text style={{ textAlign: 'center', margin: 10 }}>Testing </Text>
        }
      ></AnimatedBorderView>

      <Button
        title="Animate"
        onPress={() => {
          setReady(true);
        }}
      ></Button>
    </View>
  );
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
