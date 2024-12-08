import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal";
import { Image } from "react-bootstrap";

const Login = () => {
    const [id, setId] = useState(""); // 사용자 입력 ID
    const [password, setPassword] = useState(""); // 사용자 입력 비밀번호
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    const scope = process.env.REACT_APP_SCOPE;

    // 일반 아이디,비번 로그인 처리 함수
    const handleLogin = () => {
        console.log("입력된 ID:", id);
        console.log("입력된 Password:", password);

        if (id === "user" && password === "1234") {
            navigate("/chat"); // 성공 시 채팅 화면으로 이동
        } else {
            setShowModal(true); // 실패 시 모달 표시
        }
    };

    const getCode = () => {
        // Authorization Code 요청
        // https://accounts.google.com/o/oauth2/v2/auth?client_id=641881315317-minurkkdos2f1l2mhapepftebuh91con.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile openid&access_type=offline&prompt=consent
        //? 3. 인증 서버에 로그인하여 애플리케이션이 요청한 권한 부여
        const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
        window.location.href = authURL;
    };

    useEffect(() => {
        const fetchToken = async () => {
            //?4. 권한 부여코드를 넣어 해당 URL로 리다이렉트
            const queryParams = new URLSearchParams(window.location.search);
            const authCode = queryParams.get("code"); // URL에서 'code' 추출

            if (authCode) {
                console.log("Authorization Code:", authCode);
                // 서버로 토큰 요청
                try {
                    const response = await fetch(
                        "http://localhost:3001/get-token",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json", // JSON 형식으로 요청
                            },
                            body: JSON.stringify({ authCode }), // 권한 코드 전달
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to authenticate");
                    }
                    const data = await response.json(); // JSON 데이터로 파싱
                    const accessToken = data.access_token;
                    console.log(accessToken);
                    document.cookie = `access_token=${accessToken}; path=/; max-age=3600; SameSite=Strict`;

                    //?7. 애플리케이션은 Access Token으로 리소스 서버에 사용자 정보 요청 - 착각인듯??????
                    //
                    try {
                        const response = await fetch(
                            "https://www.googleapis.com/oauth2/v2/userinfo",
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );
                        const data = await response.json();
                        console.log("user info", data);
                        console.log(data.name);
                        //? 여기서 6.이 끝난겁니다 ~!~!~!~!~!
                        /*
                            백엔드의 app.post("/chat", async (req, res) => { 를 보러가서 액세스 토큰을 보내서 jwt변환을 하고 쿠키에 그걸 저장하는 처리를 해주세요
                            브라우저의 쿠키에 토큰이 저장되면 아래 navigate코드가 실행되도록
                        */
                        navigate(`/chat?${data.name}`); //chatting page 이동
                        // 이동만 하면 안되고 채팅을 할수 있어야되겠죠 -> websocket
                    } catch (error) {
                        console.error("Error during authentication:", error);
                        setShowModal(true);
                    }

                    // *** yyy대신에 name {name} 이런식으로 바꾼다음에 화면에 표시해보기 ***
                    // *** 쿠키에 토큰을 넣어놔야합니다. ***
                } catch (error) {
                    console.error("Error during authentication:", error);
                    setShowModal(true);
                }
            }
        };

        fetchToken(); // 비동기 함수 호출!!!
    }, []);

    const handleGoogleLoginSuccess = async () => {
        //todo 그럼 성공로그인엔 뭘해?
        // /get-userinfo 사용자 정보 가져오나 (서버에서해 프론트에서해) 위에서 함
    };

    // Google 로그인 실패 처리
    const handleGoogleLoginError = () => {
        console.log("Google Login Failed");
        setShowModal(true);
    };

    return (
        <div
            style={{
                // backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
                height: "100%",
            }}
        >
            {!showModal && (
                <Form style={{ textAlign: "center" }}>
                    {/* 중앙 정렬을 위해 textAlign 추가 */}
                    <Image
                        src="/images/chat.png"
                        alt="chat"
                        style={{
                            width: "100px",
                            height: "100px",
                            marginBottom: "30px",
                        }}
                    />
                    <Form.Group style={{ marginBottom: "20px" }}>
                        <div>ID</div>
                        <Form.Control
                            type="text"
                            placeholder="Enter your ID"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }}>
                        {/* 비밀번호 필드 여백 추가 */}
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="secondary"
                        style={{
                            width: "250px",
                            opacity: "83%",
                            padding: "10px",
                            fontSize: "20px",
                            marginTop: "10px",
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    {/* num 1. 유저가 애플리케이션 사용요청 */}
                    <div style={{ marginTop: "20px" }}>
                        {/* //?1. 유저가 애플리케이션 사용요청 */}
                        {/* //?2. 애플리케이션은 유저를 인증 서버 로그인 페이지로 리다이렉트  */}
                        <GoogleLogin
                            click_listener={() => getCode()}
                            onSuccess={handleGoogleLoginSuccess}
                            ux_mode="redirect"
                            onError={handleGoogleLoginError}
                        />
                    </div>
                </Form>
            )}
            {showModal && (
                <ModalComponent
                    show={showModal}
                    onClose={handleCloseModal}
                    title="Login Failed"
                    message="Invalid credentials. Please try again."
                />
            )}
        </div>
    );
};

export default Login;
