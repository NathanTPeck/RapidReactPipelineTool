import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import ThemeContext from "../../services/theme/ThemeContext.tsx";

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