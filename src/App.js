import Login from "./pages/login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../src/pages/chat.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <>
            <GoogleOAuthProvider clientId="641881315317-minurkkdos2f1l2mhapepftebuh91con.apps.googleusercontent.com">
                {/* <GoogleOAuthProvider clientId={clientId}> */}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    );
}

export default App;
