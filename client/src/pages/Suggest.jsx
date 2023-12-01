import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import FollowButton from "../components/FollowButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Suggest = () => {
    const navigate = useNavigate();
    const SUBAPI = "http://localhost:3000/subscribe";
    const { id } = useParams();
    const {user, updateUser} = useAuth();
    const [suggests, setSuggests] = useState();
    const SUGGEST_API = `http://localhost:3000/suggest/${id}`;
    const subscribe = (followId, followerId, followName) => {
        axios
          .post(SUBAPI, { followId: followId, followerId: followerId })
          .then((res) => {
            if (res.data.status === "FAILED") throw new Error(res.data.message);
            //update user state and localstorage after succefully sub
            const newUserState = {
              ...user,
              following: [...user.following, {_id: followId, name: followName}],
            };
            localStorage.setItem("user", JSON.stringify(newUserState));
            updateUser(newUserState);
          })
          .catch((err) => console.log(err));
      };
    useEffect(() => {
        axios.get(SUGGEST_API)
        .then((res) => setSuggests(res.data))
    }, [id])
  return (
    <div className="bg-gray-300 antialiased">
      <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
        <h1 className="font-bold text-center text-3xl text-gray-900">Users You might interested</h1>
        <div className="flex flex-col">
            {
                suggests?.map((ea) => 
                    <div className="flex flex-row justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                        <span className="self-center font-bold ">{ea.name}</span>
                        <FollowButton handler = {() => subscribe(ea._id, user._id, ea.name)}/>
                    </div>
                )
            }
            <button onClick={() => {navigate("../", { replace: true })}} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Skip</button>
        </div>
      </div>
    </div>
  )
}

export default Suggest
