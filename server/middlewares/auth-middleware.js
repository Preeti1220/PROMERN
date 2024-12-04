
import jwt from 'jsonwebtoken';
import User from '../models/user-model.js'
// import  user  from '../controllers/auth-controllers';


export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res
            .status(401)
            .json({ msg: 'unauthorized http,token not provided' })
    }

    const jwtToken = token.replace('Bearer', "").trim();
    console.log('token from auth middleware', jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0, })
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'unauthorized. invalid token.' })
    }
};
