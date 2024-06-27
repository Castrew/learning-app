"use-client"

import {createContext} from "react";
import {User} from "lucia";


export const AuthContext = createContext<
 User | null
>(null)

export const AuthProvider = ({children, user}) => {
    return (<AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>)
}