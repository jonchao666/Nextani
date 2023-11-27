import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "@/store/store";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}
