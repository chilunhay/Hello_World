const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service:process.env.SMPT_MAIL,
        auth:{
            user: process.env.SMPT_MAIL,
            password:process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from:"",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
};

module.exports = sendEmail;