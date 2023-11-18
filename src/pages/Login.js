import { Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import Img from "../assests/search.gif"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setData, setIsLogin } from "../reducer/userSlice"



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [config, setConfig] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/api/users/login", config);
            toast.success("Login Success", {
                position: "top-center",
                duration: 4000,
            });
            console.log(data);
            dispatch(setData(data?.user));
            dispatch(setIsLogin(true));
            navigate("/")
        } catch (err) {
            // add toast error
            toast.error(err.response.data.msg, {
                position: "top-center",
                duration: 4000,
            });
        }

    };


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh', width: '100%', flexDirection: 'column', gap: '32px' }}>
            <Paper elevation={2} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "60vh", width: "100%", maxWidth: "40vw" }}>
                <img src={Img} alt="" style={{ height: "80px" }} />
                <Typography variant="h4" style={{ padding: "16px" }}>Login</Typography>
                <form onSubmit={handleLogin} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', gap: '8px' }}>
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            email: e.target.value
                        }));
                    }}
                        value={config.email}
                        type="email" placeholder="Email" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            password: e.target.value
                        }));
                    }}
                        value={config.password}
                        type="password" placeholder="Password" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />

                    {/* Add the ReCAPTCHA component */}
                    {/* <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleCaptchaChange} /> */}

                    <button type="submit" style={{ height: "40px", backgroundColor: "#2fda24", width: "80%", maxWidth: "30vh", color: "white" }}>Login</button>
                </form>
                <button style={{padding:"8px"}} onClick={()=>navigate("/create-account")}>Don't have an account?</button>
            </Paper>
        </div>
    );
}

export default Login;
