import { sender, resendClient } from "../lib/resend.js";
import {createWelcomeEmailTemplate} from "./emailTemplate.js"
export const sendWelcomeEmail = async (name, email, clientURL) => {
    const {data, error} = await resendClient.emails.send({
    from: `${sender.name}<${sender.email}>`,
    to: [email],
    subject: 'Welcome to chatloom',
    html: createWelcomeEmailTemplate(name, clientURL),
    })
    if (error){
        console.error("error sending email", error)
        throw new Error("Failed to send welcome email")
    }
    console.log("Welcome email sent");
    
}