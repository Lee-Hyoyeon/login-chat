import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const port = 3001;
dotenv.config();

app.use(cors());
app.use(express.json()); // JSON 형식 바디 파싱
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 바디 파싱

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

//  * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI from the client_secret.json file. To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.

app.get("/", (req, res) => {
    res.send("Hello, this is your Express server running on port 3001!");
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("클라이언트 연결됨");

    // 클라이언트로부터 메시지를 받으면
    ws.on("message", (message) => {
        console.log("받은 메시지:", message);
        // 클라이언트에게 응답 메시지 전송
        ws.send("서버로부터 응답: " + message);
    });

    // 연결이 성공적으로 되었을 때 클라이언트에게 초기 메시지 전송
    ws.send("서버에 연결되었습니다!");
});

// 권한 부여코드를 이용해 인증 서버에 Access Token 발급
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

        // 요청 검증 후 Access Token 발급
        const data = await fetchResponse.json();
        res.json({
            access_token: data.access_token,
        });
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).send("Failed to fetch access token");
    }
});
