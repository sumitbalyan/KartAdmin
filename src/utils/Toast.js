import { ToastAndroid } from "react-native";

export const show = (message)=> {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
}

export const Toast = {
  show
}