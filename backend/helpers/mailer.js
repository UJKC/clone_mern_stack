const nodemailer = require('nodemailer');

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oauth_link = 'https://developers.google.com/oauthplayground'

const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET} = process.env

const auth = new OAuth2(
    MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link
);

exports.sendVarificationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    });
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Facebook email varification",
        html: `<div> <span> Actions require: Activate your facebook account </span> </div> <div> <span> Hello ${name} </span> <div> <span> You recently created account on UjwalHub. Please confirm your registration. </span> </div> <a href=${url}> Confirm your registration </a> <div> <span> You give up everything </span> </div> </div>`,
    };
    stmp.sendMail(mailOptions, (err, res) => {
        if (err) {
            return err;
        }
        return res;
    });
};

/*
This Node.js code uses the `nodemailer` library and the Gmail service to send a verification email. The email is intended for account verification, and it contains a link for the user to confirm their registration.

Here's a breakdown of the code:

1. **Import Required Modules:**
   ```javascript
   const nodemailer = require('nodemailer');
   const { google } = require('googleapis');
   const { OAuth2 } = google.auth;
   ```

   The code requires the `nodemailer` library for sending emails and the `googleapis` library for OAuth2 authentication.

2. **Define OAuth2 Configuration:**
   ```javascript
   const oauth_link = 'https://developers.google.com/oauthplayground';
   const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET} = process.env;

   const auth = new OAuth2(
       MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link
   );
   ```

   The OAuth2 configuration includes the OAuth playground link, and it retrieves the necessary credentials (`EMAIL`, `MAILING_ID`, `MAILING_REFRESH`, `MAILING_SECRET`) from environment variables.

3. **Send Verification Email Function:**
   ```javascript
   exports.sendVarificationEmail = (email, name, url) => {
       // Set OAuth2 credentials
       auth.setCredentials({
           refresh_token: MAILING_REFRESH,
       });

       // Get access token
       const accessToken = auth.getAccessToken();

       // Create SMTP transport
       const stmp = nodemailer.createTransport({
           service: "gmail",
           auth: {
               type: "OAUTH2",
               user: EMAIL,
               clientId: MAILING_ID,
               clientSecret: MAILING_SECRET,
               refreshToken: MAILING_REFRESH,
               accessToken,
           },
       });

       // Define email options
       const mailOptions = {
           from: EMAIL,
           to: email,
           subject: "Facebook email verification",
           html: `<div>...</div>`, // Email content with HTML formatting
       };

       // Send the email
       stmp.sendMail(mailOptions, (err, res) => {
           if (err) {
               return err; // Return error if sending fails
           }
           return res; // Return success response if email is sent
       });
   };
   ```

   This function (`sendVarificationEmail`) takes three parameters: `email` (recipient's email address), `name` (recipient's name), and `url` (verification link). It sets up the SMTP transport with OAuth2 authentication and sends an email with the specified options.

   The email content is an HTML-formatted message containing a confirmation link (`<a href=${url}> Confirm your registration </a>`).

   The function returns either an error if the email sending fails or a success response if the email is sent successfully. Note that returning from the callback function doesn't handle asynchronous results well. It might be more appropriate to use promises or async/await for better error handling and control flow.

   Certainly, let's break down the code step by step:

1. **Set OAuth2 Credentials:**
   ```javascript
   auth.setCredentials({
       refresh_token: MAILING_REFRESH,
   });
   ```

   The `setCredentials` method of the `OAuth2` instance is used to set the refresh token required for obtaining an access token.

2. **Get Access Token:**
   ```javascript
   const accessToken = auth.getAccessToken();
   ```

   The `getAccessToken` method is called to obtain the access token based on the provided refresh token.

3. **Create SMTP Transport:**
   ```javascript
   const stmp = nodemailer.createTransport({
       service: "gmail",
       auth: {
           type: "OAUTH2",
           user: EMAIL,
           clientId: MAILING_ID,
           clientSecret: MAILING_SECRET,
           refreshToken: MAILING_REFRESH,
           accessToken,
       },
   });
   ```

   The `createTransport` method from the `nodemailer` library is used to create an SMTP transport for sending emails via Gmail. It is configured with OAuth2 authentication using the obtained access token and other credentials (`EMAIL`, `MAILING_ID`, `MAILING_SECRET`, `MAILING_REFRESH`).

4. **Define Email Options:**
   ```javascript
   const mailOptions = {
       from: EMAIL,
       to: email,
       subject: "Facebook email verification",
       html: `<div>...</div>`, // Email content with HTML formatting
   };
   ```

   The `mailOptions` object defines various aspects of the email, including the sender's email address (`from`), recipient's email address (`to`), email subject (`subject`), and the HTML-formatted content of the email (`html`).

5. **Send the Email:**
   ```javascript
   stmp.sendMail(mailOptions, (err, res) => {
       if (err) {
           return err; // Return error if sending fails
       }
       return res; // Return success response if email is sent
   });
   ```

   The `sendMail` method is invoked on the SMTP transport to send the email. It takes the `mailOptions` object and a callback function that is executed once the email is sent. If there's an error during the sending process, the error is returned; otherwise, a success response is returned.

Please note that in a real-world scenario, it might be better to handle the asynchronous nature of email sending using promises or async/await for more structured and readable code. Additionally, error handling and logging can be enhanced for better diagnostics.
*/