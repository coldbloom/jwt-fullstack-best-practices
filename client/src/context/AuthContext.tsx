import React, {createContext, ReactNode, useState} from "react";


export const AuthContext = React.createContext({});

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [data, setData] = useState();

    const handleFetchProtected = () => {};

    const handleLogOut = () => {};

    const handleSignUp = () => {};

    const handleSignIn = () => {};

    return (
        <AuthContext.Provider
            value={{
                data,
                handleFetchProtected,
                handleLogOut,
                handleSignUp,
                handleSignIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;