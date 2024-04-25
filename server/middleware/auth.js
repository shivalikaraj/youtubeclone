import jwt from 'jsonwebtoken'
import users from '../models/auth.js'
import { sendEmailNotification } from './emailMiddleware.js'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            throw new Error('Authorization token not found');
        }

        // let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        let decodeData;
        try {
            decodeData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // Handle expired token error
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            } else {
                // Handle other JWT errors
                throw error;
            }
        }
        
        const user = await users.findById(decodeData.id)

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        if (user.blockedUntil && user.blockedUntil <= new Date()) {
            const updatedUser = await users.findByIdAndUpdate(user._id, { failedAttempts: 0, blockedUntil: null }, { new: true });
            req.user = updatedUser;
        } else if (user.blockedUntil && user.blockedUntil > new Date()) {
            return res.status(401).json({ message: "User is blocked. Try again later." });
        }

        if (user.failedAttempts >= 5) {
            
            const updatedUser = await users.findByIdAndUpdate(user._id, { $inc: { failedAttempts: 1 } }, { new: true });
            
            if (updatedUser.failedAttempts >= 5) {
                const oneHourLater = new Date(Date.now() + 60 * 60 * 1000); // One hour from now
                await users.findByIdAndUpdate(updatedUser._id, { blockedUntil: oneHourLater });

                const recipient = user.email;
                const subject = 'Account Blocked';
                const message = 'Your account has been blocked for one hour due to multiple failed login attempts.';
                await sendEmailNotification(recipient, subject, message);


                return res.status(401).json({ message: "User is blocked for one hour due to multiple failed login attempts." });
            }
        }

        req.user = user;
        req.userId = decodeData?.id

        
        next();
    } catch (error) {
        res.status(400).json("Invalid Credentials")
        next(error);
    }
}


export default auth