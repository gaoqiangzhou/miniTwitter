const jwt = require("jsonwebtoken")
const User = require("../Models/user")
const requireAuth = async (req, res, next) => {
    //verify authentication
    const {authorization } = req.headers;
    if(!authorization) return res.json({
        status: "FAILED",
        message: "Authorization token needed"
    })
    const token = authorization.split(" ")[1];

    try{

        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findOne({ _id }).select("_id");
        next();

    }catch(err){
        res.json({
            status: "FAILED",
            message: "request not authorized"
        })
    }

}

module.exports = requireAuth