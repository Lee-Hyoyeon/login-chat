import express from "express";
import session from "express-session";
import { google } from "googleapis";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json()); // JSON 형식 바디 파싱
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 바디 파싱

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

// const CLIENT_ID =
//     "641881315317-minurkkdos2f1l2mhapepftebuh91con.apps.googleusercontent.com";
// const CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET;
// const REDIRECT_URL = "http://localhost:3000";
// /**
//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI from the client_secret.json file. To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
//  */

// 세션 설정 필요없나?
// app.use(
//     session({
//         secret: CLIENT_SECRET,
//         resave: false,
//         saveUninitialized: true,
//     })
// );
app.get("/", (req, res) => {
    res.send("Welcome to Google OAuth example!");
});

//!5. 권한 부여코드를 이용해 인증 서버에 Access Token 발급
app.post("/get-token", async (req, res) => {
    const { authCode } = req.body; // 요청 객체는 req이고, body에서 authCode 추출
    try {
        const fetchResponse = await fetch(
            "https://oauth2.googleapis.com/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: authCode,
                    redirect_uri: REDIRECT_URL,
                    grant_type: "authorization_code",
                }),
            }
        );
        //!6. 요청 검증 후 Access Token 발급  -- 1, 2이런식으로 해야할때가 있다. 한 처리에 끝나지 않을때가 있기 때문에
        const data = await fetchResponse.json();
        res.json(data); // 액세스 토큰을 클라이언트로 전달할 필요가 있나?
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).send("Failed to fetch access token");
    }
});

// app.post("/chat", async (req, res) => {
//     res.cookie("cookie-name", value)
// }

// 서버에서 사용자 정보를 가져오는 엔드포인트
// app.post("/get-userinfo", async (req, res) => {
//     const { accessToken } = req.body;
//     try {
//         const response = await fetch(
//             "https://www.googleapis.com/oauth2/v2/userinfo",
//             {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         if (!response.ok) {
//             throw new Error("Failed to fetch user information");
//         }
//         const userInfo = await response.json();
//         res.json(userInfo);
//     } catch (error) {
//         console.error("Error fetching user info:", error);
//         res.status(500).send("Failed to fetch user information");
//     }
// });

// port: 3001
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
