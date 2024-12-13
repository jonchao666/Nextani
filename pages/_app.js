import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import AuthInitializer from "@/utils/AuthInitializer";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

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
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="description"
              content="Explore diverse genres, find your favorites, and create personalized watchlists. At NextAni, we unite through stories and adventures in anime."
            />
          </Head>
          {domLoaded && (
            <Toaster position="bottom-right" reverseOrder={false} />
          )}
          <AuthInitializer />
          <Analytics/>
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}
