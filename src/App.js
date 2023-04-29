import React from "react";
import "./App.module.scss";
import BaseLayout from "./components/BaseLayout";
import { BrowserRouter } from "react-router-dom";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";

function App() {
  const { provider, webSocketProvider } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true
  });
  return (
    <div>
      <WagmiConfig client={client}>
        <BrowserRouter>
          <BaseLayout />
        </BrowserRouter>
      </WagmiConfig>
    </div>
  );
}

export default App;
