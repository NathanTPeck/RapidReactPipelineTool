import { createContext } from "react";

export type MockUser = {
    name: string;
    email: string;
}

export type NullableTokenInfo = TokenInfo | null;

type TokenInfo = {
    accessToken: string | null | undefined;
    refreshToken: string | null | undefined;
    tokenExpires: number | null | undefined;
};

const AuthContext = createContext<{
    user: MockUser | null;
    isLoaded: boolean;
    setTokenInfo: (tokenInfo: NullableTokenInfo) => void;
    setUser: (user: MockUser) => void;
    logout: () => Promise<void>;
}>({
    user: null,
    isLoaded: false,
    setTokenInfo: () => {},
    setUser: () => {},
    logout: async () => {},
});

export default AuthContext;