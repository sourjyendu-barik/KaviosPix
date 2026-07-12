// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProvider from "./context/AuthProvider.tsx";
import { store } from "./store/app.ts";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="318712121759-binm17mh9kqdsve7j8sro9phdhfv2hnb.apps.googleusercontent.com">
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </GoogleOAuthProvider>,
  // {/* </StrictMode>, */}
);
