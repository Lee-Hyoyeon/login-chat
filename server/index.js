import express from "express";
import session from "express-session";
import { google } from "googleapis";
import { randomBytes } from "crypto";
import dotenv from "dotenv";

dotenv.config(); // .env 파일 불러오기

const app = express();
const port = 3001;

// https://accounts.google.com/o/oauth2/v2/auth?
// client_id=641881315317-minurkkdos2f1l2mhapepftebuh91con.apps.googleusercontent.com&
// redirect_uri=http://localhost:3000&
// response_type=code&
// scope=https://www.googleapis.com/auth/userinfo.profile%20openid&
// access_type=offline

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
// 세션 설정
app.use(
    session({
        secret: "your_secret_key", //todo Change this to your secure key
        resave: false,
        saveUninitialized: true,
    })
);

const oauth2Client = new google.auth.OAuth2(
    process.env.YOUR_CLIENT_ID,
    process.env.YOUR_CLIENT_SECRET,
    process.env.YOUR_REDIRECT_URL
);

const scopes = "https://www.googleapis.com/auth/userinfo.profile openid";

// app.get("/", (req, res) => {
//     res.send("Welcome to Google OAuth example!");
// });

app.get("/", (req, res) => {
    const state = randomBytes(32).toString("hex");
    req.session.state = state;
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        response_type: "code",
        state: state,
    });

    res.send(`<a href="${authorizationUrl}">Authenticate with Google</a>`);
});

// app.get("/callback", async (req, res) => {
//     const { code, state } = req.query;

//     if (state !== req.session.state) {
//         return res.status(400).send("Invalid state parameter");
//     }

//     try {
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         res.send("Authentication successful!");
//     } catch (err) {
//         console.error("Error retrieving access token", err);
//         res.status(500).send("Authentication failed");
//     }
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
