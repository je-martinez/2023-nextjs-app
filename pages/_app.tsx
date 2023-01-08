import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "@/store/index";
import { AuthProvider } from "@/providers/auth.provider";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
