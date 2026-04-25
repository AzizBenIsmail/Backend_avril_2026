const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuthUser = async (req, res, next) => {
    const token = req.cookies.jwt_token;
    console.log('jwt token', token);

    if(token) {

        jwt.verify(token,"net secret",async (err, decodedToken) => {

            if(err) {
                res.status(401).json("problem decoding token")
            }else {
                console.log("decodedToken",decodedToken)
                console.log("decodedToken id ",decodedToken.id)

                    //nsina configuration ta3 session fil app.js ba3ed pause nchoufouha 
                user = await userModel.findById(decodedToken.id)
                console.log("user", user)
                req.user = user
                next();
            }

        });
    
    } else {
        res.status(401).json("/pas de token / il faut etre conn")
    }
}

module.exports = {requireAuthUser};