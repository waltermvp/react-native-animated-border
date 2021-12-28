import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';
import { AnimatedBorderView } from 'react-native-animated-border';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();
  const [ready, setReady] = useState(false);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <AnimatedBorderView
          startAnimation={ready}
          style={styles.box}
          children={
            <Text style={{ textAlign: 'center', margin: 10 }}>Testing </Text>
          }
          animationComplete={() => {
            console.log('did complete');
          }}
        ></AnimatedBorderView>

        <Button variant={'solid'} onPress={() => setReady(!ready)}>
          {ready ? 'Undo' : 'Animate'}
        </Button>
      </View>
    </NativeBaseProvider>
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
