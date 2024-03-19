const { createTransport } = require('nodemailer')
const { configObject } = require('../config')


const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user,
        pass: configObject.gmail_password
    }
})

const from = 'Servicio de mesajería de server ecommerce <archivoeleo@gmail.com>'

const sendEmail = async (toEmail, subject, html) => {
    return await transport.sendMail({
        from,
        to: toEmail,
        subject,
        html
    })
}

module.exports = {
    sendEmail
}