import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthContextProvider({children}){
    const APISIGNUP = "http://localhost:3000/user/register";
    const APILOGIN = "http://localhost:3000/user/login";
    const APIFOLLOWER = "http://localhost:3000/subscribe/follower/";
    const APIFOLLOWING = "http://localhost:3000/subscribe/following/";
    const [user, setUser] = useState(null);
    const [isLoading, setIsloading] = useState(null);
    const signup = (name, type, password) => {
        setIsloading(true);
        axios.post(APISIGNUP, {name: name, type: type, password: password})
        .then(res => {
            if(res.data.status == "FAILED") throw new Error('sing up failed');
            //save the user into local storage
            const data = res.data;
            const userInfo = {
                name: data.data.name,
                type: data.data.type,
                _id: data.data._id,
                token: data.token,
                following: [],
                follower: []
            }
            localStorage.setItem('user', JSON.stringify(userInfo));
            //update user
            setUser(userInfo);
            setIsloading(false);
        })
        .catch(err => console.log(err))
    }
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');
        setUser(null);
    }
    const login = async (name, password) => {
        setIsloading(true);
        const res = await axios.post(APILOGIN, {name: name, password: password})
        try
        {
            if(res.data.status == "FAILED") throw new Error(res.data.message);
            const data = res.data;
            const id = data.data._id;
            const following = await axios.get(APIFOLLOWING + id);
            const follower = await axios.get(APIFOLLOWER + id);
            const userInfo = {
                 name: data.data.name,
                 type: data.data.type,
                 _id: data.data._id,
                 token: data.token,
                 following: following.data,
                 follower: follower.data
             }
             localStorage.setItem('user', JSON.stringify(userInfo));
             //update user
            setUser(userInfo);
            setIsloading(false);
        }catch(err)
        {
            console.log(err)
        }
        // .then(res => {
        //     if(res.data.status == "FAILED") throw new Error(res.data.message);
        //     //save the user into local storage
        //     const data = res.data;
        //     const userInfo = {
        //         name: data.data.name,
        //         type: data.data.type,
        //         _id: data.data._id,
        //         token: data.token
        //     }
        //     localStorage.setItem('user', JSON.stringify(userInfo));
            
        //     //update user
        //     setUser(userInfo);
        //     setIsloading(false);
        // })
        // .catch(err => console.log(err))
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