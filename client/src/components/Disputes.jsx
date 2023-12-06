import React, {useState, useEffect} from 'react'
import { useDispute } from '../contexts/DisputeContext'
import { useAuth } from '../contexts/AuthContext';

const Disputes = (props) => {
    const {user} = useAuth()
    // const { disputes } = useDispute();
    // const [myDisputes, setMyDisputes] = useState([])
    // useEffect(() => {
    //     setMyDisputes( () => disputes.filter((ea) => ea.from === user._id))
    // }, [])
  return (
    <div className="bg-white shadow rounded-lg w-1/3">
        <h1 className="font-bold text-center text-3xl text-gray-900">Your Disputes</h1>
        <div className="flex flex-col">
            {
                props.disputes?.filter((ea) => ea.from === user._id).map((ea) => 
                    <div className="flex flex-col justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                        <span className="font-bold ">Reason: {ea.disputeReason}</span>
                        <span className="font-bold ">On ComplaintId: {ea.complain._id}</span>
                        <span className="font-bold ">On {(ea.complain.complaintType === "post")? `postID:${ea.complain.postId}` : "Profile"}</span>
                        <span className="font-bold ">Complaint Reason: {ea.complain.reason}</span>
                    </div>
                )
            }
        </div>
      </div>
  )
}

export default Disputes
