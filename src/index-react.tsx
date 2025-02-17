import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./main.tsx";
import { initBolt } from "./utils/utils";
import { Provider, View } from "@adobe/react-spectrum";
import { theme as expressTheme } from "@react-spectrum/theme-express";
initBolt();

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <Provider theme={expressTheme} colorScheme="light" scale="medium">
      <View paddingX={"size-200"} backgroundColor={"gray-50"}>
        <App />
      </View>
    </Provider>
  </React.StrictMode>,
);
