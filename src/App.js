import Login from "./pages/login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../src/pages/chat.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <>
            <GoogleOAuthProvider clientId="641881315317-minurkkdos2f1l2mhapepftebuh91con.apps.googleusercontent.com">
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
