# react-native-animated-border
A simple view that animates the border using a fill animation. Built with reanimated 2.3.

<!-- ![Simple Demo](demo/demo.gif) -->
<img src="demo/demo.gif" width="320">

## Aniamtion Options
* Double fill start from bottom center finish top center


## Props

```js
export interface AnimatedBorderViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  startAnimation: Boolean;
  color?: string; // default green
  animationWidth?: number; // default 2
  animationDuration?: number; // default 1500
}
```


## Installation

```sh
npm install react-native-animated-border
```

## Usage

```js
import AnimatedBorderView from "react-native-animated-border";

// ...

      <AnimatedBorderView
        startAnimation={ready}
        style={styles.box}
        children={
          <Text style={{ textAlign: 'center', margin: 10 }}>Testing </Text>
        }
      ></AnimatedBorderView>
```

## TODO

* [X] Undo Functionality
* [ ] Implements new fill animations
    * [X] Double fill start from middle bottom
    * [ ] One way fill
    * [ ] Choose a corner to start fill
    
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
