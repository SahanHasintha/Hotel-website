const jwt = require('jsonwebtoken');


const verification = (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token, authorized denied'});
    }

    try {
        jwt.verify(
            token,
            "mysecrettoken",
            (err, data)=>{
                if(err){
                    console.log(err.message);
                    return res.status(401).json('token is not verify');
                }
                req.data = data;
                next();

            });
    } catch (err) {
        console.log(err.message);
        res.json('token is not validate');
    }
}

module.exports = verification;