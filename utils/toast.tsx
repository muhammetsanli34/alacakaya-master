import * as ToastManager from "react-native-toast-message";

export const showToast = (
  type: "success" | "error" | "info",
  text: string,
  visibilityTime = 5000
) => {
  ToastManager.default.show({
    type: type,
    text1: text,
    visibilityTime: visibilityTime,
  });
};

const toastConfig = {
  error: (props: any) => (
    <ToastManager.ErrorToast {...props} text1NumberOfLines={3} />
  ),
};

const Toast = () => {
  return <ToastManager.default config={toastConfig} />;
};

export { Toast, toastConfig };
