import React, {useEffect, useState} from 'react';
import AuthContext from './authContext';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (newToken: string, newUserId: string) => {
        setToken(newToken);
        setUserId(newUserId);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userId', newUserId);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{token, userId, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
