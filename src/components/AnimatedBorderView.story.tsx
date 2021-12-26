// import * as React from "react"
// import { storiesOf } from "@storybook/react-native"
// import { StoryScreen, Story, UseCase } from "../../../storybook/views"
// import { color } from "../../theme"
// import { Thumbnails } from "./thumbnails"

// const EMPTY = []

// const ONE = [
//   { uri: require("../../../assets/images/onboarding/logo.png"), yaw: -30, key: "-30" },
//   { uri: null, key: "-15", yaw: 15 },
// ]
// storiesOf("Thumbnails", module)
//   .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
//   .add("Different State", () => (
//     <Story>
//       <UseCase text="Empty" usage="The primary.">
//         <Thumbnails
//           style={{ backgroundColor: "red" }}
//           thumbnails={EMPTY}
//           onPressThumb={function (
//             thumbIndex: any,
//             thumnail: { uri: string; yaw: number; onPress: any },
//           ): {} {
//             throw new Error("Function not implemented.")
//           }}
//         />
//       </UseCase>
//       <UseCase text="Full" usage="The primary.">
//         <Thumbnails
//           style={{ backgroundColor: "gray" }}
//           thumbnails={ONE}
//           onPressThumb={function (
//             thumbIndex: any,
//             thumnail: { uri: string; yaw: number; onPress: any },
//           ): {} {
//             throw new Error("Function not implemented.")
//           }}
//         />
//       </UseCase>
//     </Story>
//   ))
//   .add("Style Presets", () => (
//     <Story>
//       <UseCase text="Empty" usage="The primary.">
//         <Thumbnails
//           thumbnails={[]}
//           onPressThumb={function (
//             thumbIndex: any,
//             thumnail: { uri: string; yaw: number; onPress: any },
//           ): {} {
//             throw new Error("Function not implemented.")
//           }}
//         />
//       </UseCase>
//       <UseCase text="Empty1" usage="The primary.">
//         <Thumbnails
//           thumbnails={[]}
//           onPressThumb={function (
//             thumbIndex: any,
//             thumnail: { uri: string; yaw: number; onPress: any },
//           ): {} {
//             throw new Error("Function not implemented.")
//           }}
//         />
//       </UseCase>
//     </Story>
//   ))
