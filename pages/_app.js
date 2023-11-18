import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@/store/store";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}
