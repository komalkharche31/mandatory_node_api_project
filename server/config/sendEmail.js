import { Resend } from 'resend';

if(!process.env.RESEND_API){
    console.log("Please provide RESEND_API In env file")
}

const resend = new Resend(process.env.RESEND_API);

const senEmail =async ({name, sendTo, subject, html}) =>{
    try {
        const { data , error } = await resend.emails.send({
            from: 'binkyit@resend.dev',
            to: sendTo,
            subject: subject,
            html: html
          });

          if(error){
            return console.error({error})
          }

          return data;

    } catch (error) {
        console.log("Email is nod Send please check this error", error)
    }
}
export default senEmail;

