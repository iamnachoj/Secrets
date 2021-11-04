# Secrets
 Single Page Application that allows to add anonymous statements. It is a basic and minimalistic version of <a href="https://play.google.com/store/apps/details?id=sh.whisper&hl=en&gl=US">The Whisper App</a>. Users can sign up, submit their secrets for the world to see, but they don't have to tell the world who they are, and the app keep their secret anonymous.

## Tools
 - Node.js
 - Express.js
 - Passport.js
 - Oauth2.0 with Google
 - express sessions
 - EJS templating

## How it works?

The Secrets application was created in order to understand and go deeper into the complexities of web security, authorization and authentication. It works with passport.js, although previous branches and commits have used MD5 hashing, bcrypt and mongoose-encryption.

It also works with cookies and sessions, which are the most secure cookies for logged users.

The app allows users to create a secure user and add anonymous secrets to the application, so that people can read them without knowing who wrote them. It is a very interesting (and funny) way to practice this security systems, and there are many sites out there that are used for the same purpose.

## Deployment 

 - Fork it on your github account, and clone it locally.
 - From your Command Line Interface, ``cd`` into the folder and run the first package.json script: ``npm start`` . It will launch parcel and bundle up the code.
 - Once budled up, it will serve the file on port 1234. Run it from the browser, and the site will be there
