import jwt from 'jsonwebtoken'
import users from '../models/auth.js'
import bcrypt from 'bcryptjs'

export const signup = async( req, res ) => {
    const {email, password} = req.body;
    
    try {
        const existingUser = await users.findOne({email})
        if(!existingUser){

            try {
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = await users.create({email, password: hashedPassword})
                const token =jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.JWT_SECRET,{
                    expiresIn: "30d"
                })
                res.status(200).json({result: newUser, token})
            } catch (error) {
                res.status(500).json({message: "Something went wrong..."})
            }
        } else {
            res.status(400).json({message: "email already exists!"})
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong..."})
    }
}

export const signin = async (req, res ) => {
    const {email, password} = req.body;

    try {
        const user = await users.findOne({email});

        if(!user) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            await users.findByIdAndUpdate(user._id, {$inc: {failedAttempts: 1}})
            return res.status(401).json({message: "Invalid credentials!"});
        }

        await users.findByIdAndUpdate(user._id, {failedAttempts: 0})

        req.user = user

        const token =jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_SECRET,{
            expiresIn: "30d"
        })
        res.status(200).json({result: user, token})

        
    } catch (error) {
        console.log("Error during login: ", error)
        res.status(500).json("Internal server error");
    }

}

export const login = async( req,res)=>{

    const {email} = req.body;
    // console.log(email)
    try {
        const existingUser = await users.findOne({email})
        if (!existingUser) {
            try {
                const newUser = await users.create({email})

                const token =jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.JWT_SECRET,{
                    expiresIn: "1h"
                })
                res.status(200).json({result: newUser, token})
            } catch (error) {

                res.status(500).json({message: "Something went wrong..."})

            }
        } else {
            const token =jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, process.env.JWT_SECRET,{
                expiresIn: "1h"
            })
            res.status(200).json({result: existingUser, token})
        }
    } catch (error) {

        res.status(500).json({message: "Something went wrong..."})
    }
}

