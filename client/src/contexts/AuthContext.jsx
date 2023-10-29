import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthContextProvider({children}){
    const APISIGNUP = "http://localhost:3000/user/register";
    const APILOGIN = "http://localhost:3000/user/login";
    const [user, setUser] = useState(null);
    const [isLoading, setIsloading] = useState(null);
    const signup = (name, password) => {
        setIsloading(true);
        axios.post(APISIGNUP, {name: name, type: "OU", password: password})
        .then(res => {
            if(res.data.status == "FAILED") throw new Error('sing up failed');
            //save the user into local storage
            localStorage.setItem('user', JSON.stringify(res.data));
            //update user
            setUser(res.data);
            setIsloading(false);
        })
        .catch(err => console.log(err))
    }
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');
        setUser(null);
    }
    const login = (name, password) => {
        setIsloading(true);
        axios.post(APILOGIN, {name: name, password: password})
        .then(res => {
            if(res.data.status == "FAILED") throw new Error(res.data.message);
            //save the user into local storage
            localStorage.setItem('user', JSON.stringify(res.data));
            
            //update user
            setUser(res.data);
            setIsloading(false);
        })
        .catch(err => console.log(err))
    }
    
    const values = {
        user: user,
        signup: signup,
        logout: logout,
        login: login,
        isLoading: isLoading
    }
    //keep login 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) setUser(user);
    }, [])

    return (
        <AuthContext.Provider value = {values}>
            {children}
        </AuthContext.Provider>
    )
}