const nodemailer = require('nodemailer');
// const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.emailAddress,
    console.log(user)
    this.firstName = user.fullName.split(' ')[0];
    this.url = url;
    this.from = `Sarah Barugu <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {

    return nodemailer.createTransport({
      host: process.env.GMAIL_HOST,
      port: process.env.GMAIL_PORT,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }

  // send the actual email
  async send(template, subject) {
    const html = template

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.toString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font=size: 20px;
                padding: 5px
            }
        }
        </style>
    </head>
    <body>
        <p>Hi ${this.firstName}</p>
        <P>Welcome to the Application Tracker App, we're glad to have you 🎉🙏</P>
        <p> We're all a big family here <br> ${this.url}.</p>
        
    </body>
  </html>
    `, 'Welcome to the Application Tracker App!');
  }

  async sendPasswordReset() {
    await this.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font=size: 20px;
                padding: 5px
            }
        }
        </style>
    </head>
    <body>
        <p>Hi ${this.firstName}</p>
        <p>Forgot your password? Please use the link to reset your password: ${this.url}.</p>
    </body>
  </html>
    `, 'Your password reset token (valid for only 10 minutes)');
  }
};