import { PropsWithChildren } from "react";
import useAuth from "../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren) => {
    const { user, isLoaded } = useAuth();

    if (!isLoaded) {
        return <img src="../../public/loading.svg" className="m-auto" alt="loading..."/>
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return (props.children);
};

export default ProtectedRoute;