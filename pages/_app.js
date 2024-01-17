import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          {domLoaded && (
            <Toaster position="bottom-right" reverseOrder={false} />
          )}
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}
