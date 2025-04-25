// import pages
import "./styles/App.css";
import * as Sentry from "@sentry/browser";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";

// import "../sass/style.scss";

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById("react-app") as HTMLElement);
root.render(
  <Router>
    <App />
  </Router>,
);
