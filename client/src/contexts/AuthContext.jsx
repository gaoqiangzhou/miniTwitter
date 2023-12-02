import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthContextProvider({children}){
    const APISIGNUP = "http://localhost:3000/user/register";
    const APILOGIN = "http://localhost:3000/user/login";
    const API_USER = (id) => `http://localhost:3000/user/profile/${id}`;
    const SUBAPI = "http://localhost:3000/subscribe";

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
                balance: data.data.account_balance,
                token: data.token,
                following: [],
                follower: [],
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
            const user = (await axios.get(API_USER(id))).data
            const userInfo = {
                 name: data.data.name,
                 type: data.data.type,
                 _id: data.data._id,
                 balance: user.balance,
                 token: data.token,
                 following: user.followings,
                 follower: user.followers,
             }
             localStorage.setItem('user', JSON.stringify(userInfo));
             //update user
            setUser(userInfo);
            setIsloading(false);
            return userInfo;
        }catch(err)
        {
            console.log(err)
        }
    }
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    const subscribe = (followId, followName, followerId) => {
        axios.post(SUBAPI, { followId: followId, followerId: followerId })
             .then((res) => {
                if (res.data.status === "FAILED") throw new Error(res.data.message);
                const newUserState = {
                    ...user,
                    following: [
                      ...user.following,
                      { _id: followId, name: followName },
                    ],
                  };
                  localStorage.setItem("user", JSON.stringify(newUserState));
                  setUser(newUserState);
             })
             .catch((err) => console.log(err));
    }
    const unSubscribe = (followId, followerId) => {
        axios.put(SUBAPI, { followId: followId, followerId: followerId })
             .then((res) => {
                const newUserState = {
                    ...user,
                    following: user.following.filter((e) => e._id !== followId),
                  };
                  localStorage.setItem("user", JSON.stringify(newUserState));
                  setUser(newUserState);
             })
             .catch((err) => console.log(err));
    }
    
    const values = {
        user: user,
        updateUser: updateUser,
        signup: signup,
        logout: logout,
        login: login,
        subscribe: subscribe,
        unSubscribe: unSubscribe,
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