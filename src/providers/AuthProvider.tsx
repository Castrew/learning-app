"use client"

import {createContext} from "react";
import {User} from "lucia";


export const AuthContext = createContext<
 User | null
>(null)