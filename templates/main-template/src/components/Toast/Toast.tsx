import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import ThemeContext from "../../contexts/Theme/ThemeContext.tsx";

const Toast = () => {
    const { themeMode } = useContext(ThemeContext);

    return (
        <ToastContainer
            position="top-right"
            newestOnTop
            theme={themeMode}
        />
    );
};

export default Toast;