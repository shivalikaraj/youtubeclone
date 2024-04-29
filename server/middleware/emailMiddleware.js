import nodemailer from 'nodemailer'

export const emailMiddleware = async (req, res, next) => {
    
    try {
        const failedAttempts = req.user.failedAttempts
        const threshold = 2

        if(failedAttempts === threshold) {
           const recipient = req.user.email;
           const subject = 'Security Alert: Multiple Failed Signin Attempts'
           const message = 'Your account has experienced multiple failed login attempts.'

           await sendEmailNotification(recipient, subject, message)
        }

        next();
        
    } catch (error) {
        console.error('Error in email middleware:', error)
        res.status(500).json({error: "Internal server error"})
    }
}

export const sendEmailNotification = async (recipient, subject, message) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
        })

        const mailOptions = {
            from: '"YOUTUBE" <youtube@alert.com>',
            to: recipient,
            subject: subject,
            text: message
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent', info.response)
        
    } catch (error) {
        console.error('Error sending mail:', error)
    }
}

