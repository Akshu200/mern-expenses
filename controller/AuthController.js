
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// const categories = [
//     { label: "Travel", icon: "user" },
//     { label: "Shopping", icon: "user" },
//     { label: "Investment", icon: "user" },
//     { label: "Bills", icon: "user" },
// ];


export const register = async (req, res) => {



    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(406).json({ message: 'user already exist' });
        return;
    }
    //hashing the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedpassword = await bcrypt.hashSync(password, salt);


    const user = await User({
        email,
        password: hashedpassword,
        firstName,
        lastName,
        
    });
    await user.save();


    res.status(201).json({ message: "user is created" })
}


export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(406).json({ message: 'crediantil not found' });
        return;
    }

    //matching hashed password
    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
        res.status(406).json({ message: 'crediantil not found' });
        return;
    }

    // create jwt token
    const payload = {

        username: email,

        _id: user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);
    res.json({ message: 'successfully logged in.', token, user })

}