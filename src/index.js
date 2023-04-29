import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { light, dark } from "@pancakeswap/uikit";
// import { ResetCSS } from "@pancakeswap/uikit";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
