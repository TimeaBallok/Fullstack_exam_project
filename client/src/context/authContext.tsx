import React from 'react';

type AuthContextProps = {
    token: string | null;
    userId: string | null;
    login: (token: string, userId: string) => void;
    logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
    token: null,
    userId: null,
    login: (token: string, userId: string) => {},
    logout: () => {},
});

export default AuthContext;
