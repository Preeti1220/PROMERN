
import User from "../models/user-model.js"
import bcrypt from 'bcryptjs';


// HOME

export const home = async (req, res) => {

    try {
        res.status(200).send('welcome to this is home page')
    }
    catch (error) {
        res.status(500).send('internal server error')
    }
}

// REGISTER

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, phone, password } = req.body

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json('user already exist')
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound)

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        })
        res.status(201).json({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    }
    catch (error) {
        // res.status(500).json('internal server error')
        next();
    }
};

// LOGIN

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email })
        console.log(userExist)

        if (!userExist) {
            return res.status(201).json({ message: "invalid credentials" })
        }

        // const user = await bcrypt.compare(password, userExist.password)
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: "login successfull",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        } else {
            res.status(401).json("inavalid email or password");
        }

    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' })
    }
};

// to send user data-User data

export const user = async (req, res) => {
    try {
        const userData = req.user
        console.log(userData);
        return res.status(200).json({ userData })
    } catch (error) {
        console.log(`error from the user ${error}`)
    }
}