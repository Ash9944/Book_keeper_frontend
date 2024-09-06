import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    return (
        <AppContext.Provider value={{ userToken, setUserToken, userDetails, setUserDetails }}>
            {children}
        </AppContext.Provider>
    );
};
