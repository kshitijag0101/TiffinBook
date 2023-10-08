import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
const AuthContext = createContext();

function Provider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    const store = {
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
        showSignUp,
        setShowSignUp,
    };
    return (
        <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, Provider };
