import React from "react";
import ReactDOM from "react-dom/client";
import { parseCookies, destroyCookie } from "nookies";
// Global Styles

import "./styles/dashboard.css";
import "./styles/bootstrap.min.css";
import "./styles/animate.min.css";
import "./styles/boxicons.min.css";
import "./styles/flaticon.css";
import "./styles/nprogress.css";
import "./styles/navbar.css";
import "./styles/index.css";
import "./styles/default.css";

// import "./styles/style.css";
// import "./styles/responsive.css";

import "./styles/style.min.css";
import "./styles/responsive.min.css";
import "react-loading-skeleton/dist/skeleton.css";

import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes/Routes";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CookiesProvider>
        <AppRoutes />
      </CookiesProvider>
    </PersistGate>
  </Provider>
);
