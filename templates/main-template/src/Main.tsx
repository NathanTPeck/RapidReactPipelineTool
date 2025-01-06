import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <App>
            <Router>
                <AppRoutes/>
            </Router>
        </App>
    </StrictMode>
);
