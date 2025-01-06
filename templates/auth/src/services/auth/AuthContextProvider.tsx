import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import AuthContext, { MockUser, NullableTokenInfo } from "./AuthContext.tsx";

// Todo remove after integrating with backend
export const mockUser: MockUser = {
    name: "Mock Name",
    email: "mock@email.com",
}
export const mockToken: NullableTokenInfo = {
    accessToken: "1",
    refreshToken: "2",
    tokenExpires: Date.UTC(2090),
}

const AuthContextProvider = (props: PropsWithChildren) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<MockUser | null>(null);
    const tokenStorageName = "session-token"

    const setTokenInfo = useCallback((tokenInfo: NullableTokenInfo) => {
        sessionStorage.setItem(tokenStorageName, JSON.stringify(tokenInfo));

        if (!tokenInfo){
            setUser(null);
        }
    }, [])

    const getTokenInfo = () => {
        return JSON.parse(sessionStorage.getItem(tokenStorageName) ?? "null") as NullableTokenInfo;
    }

    const logout = useCallback(async () => {
        const token = getTokenInfo();

        if (token?.accessToken) {
            // ToDo logout user in backend
        }
        setTokenInfo(null);
    }, [setTokenInfo]);

    const loadUserData = useCallback(async () => {
        const token = getTokenInfo();

        try {
            if (token?.accessToken) {
                // Todo fetch user data from backend

                setUser(mockUser);
            }
        } finally {
            setIsLoaded(true);
        }
    }, [logout]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        isLoaded,
        setTokenInfo,
        logout
    }), [user, isLoaded, logout, setTokenInfo]);

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;