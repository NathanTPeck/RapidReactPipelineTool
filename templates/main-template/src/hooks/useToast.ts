import { toast, ToastContent } from "react-toastify";

type ToastType = "success" | "info" | "warn" | "error";

const useToast = () => {
    const notify = (type: ToastType, text: ToastContent) => {
        switch (type) {
            case "success":
                toast.success(text);
                break;
            case "error":
                toast.error(text);
                break;
            case "warn":
                toast.warn(text);
                break;
            case "info":
                toast.info(text);
                break;
            default:
                toast.error("Invalid toast type: " + type);
        }
    };

    return { notify };
};

export default useToast;