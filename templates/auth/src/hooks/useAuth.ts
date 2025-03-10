import { useContext } from "react";
import AuthContext from "../services/auth/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;