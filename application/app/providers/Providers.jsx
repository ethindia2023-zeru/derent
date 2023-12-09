"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiConfig, chains } from "@/helpers/wallet/WalletConfig";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={{
            lightMode: lightTheme({
              accentColor: "#ff77e1",
              accentColorForeground: "#1A1B1F",
              borderRadius: "small",
              overlayBlur: "small",
            }),
            darkMode: darkTheme({
              accentColor: "#35f0d0",
              accentColorForeground: "#1A1B1F",
              borderRadius: "small",
              overlayBlur: "small",
            }),
          }}
          appInfo={{
            appName: "Derent",
          }}
        >
          <div>{children}</div>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
