import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const DisputeContext = createContext();
export function useDispute(){
    return useContext(DisputeContext);
}

export function DisputeContextProvider({children}){
    const DISPUTE_API = "http://localhost:3000/dispute/"
    const[disputes, setDisputes] = useState([]);
    const sendDispute = (complaintId, userId, reason) => {
        axios.post(DISPUTE_API+complaintId, {userId: userId, reason: reason})
        .then((res) => {
            if(res.data.status == "FAILED") throw new Error('send dispute failed');
            setDisputes([...disputes, res.data.dispute])
        }).catch(err => console.log(err))
    }
    const processDispute = (disputeId, decision) => {
        axios.put(DISPUTE_API+disputeId, {approved: decision})
            .then((res) => {
                if(res.data.status == "FAILED") throw new Error('process dispute failed');
                setDisputes(disputes.filter((ea) => ea._id !== disputeId))
            }).catch(err => console.log(err))
    }
    const values = {
        disputes: disputes,
        setDisputes: setDisputes,
        sendDispute: sendDispute,
        processDispute: processDispute
    }
    //keep login 
    useEffect(() => {
        axios.get(DISPUTE_API)
        .then((res) => {
            if(res.data.status == "FAILED") throw new Error('gets dispute failed');
            setDisputes(res.data.disputes);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <DisputeContext.Provider value = {values}>
            {children}
        </DisputeContext.Provider>
    )
}