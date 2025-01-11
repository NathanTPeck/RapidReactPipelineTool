import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes.tsx";
import "./index.css";
import App from "./App.tsx";
import Toast from "./components/Toast/Toast.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <App>
            <Router>
                <AppRoutes/>
            </Router>
            <Toast />
        </App>
    </StrictMode>
);
