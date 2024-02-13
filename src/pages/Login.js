import { Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import Img from "../assests/search.gif"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setData, setIsLogin } from "../reducer/userSlice"
import { LoginApi } from '../api/post/Login';
import { CircularProgress } from '@mui/material';



function Login() {
    const navigate = useNavigate();
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    useEffect(() => {
        console.log(data);
        if (data) {
            navigate("/");
        }
    }, [data, navigate])

    const dispatch = useDispatch();
    const [config, setConfig] = useState({
        email: "",
        password: "",
    });


    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            const res = await LoginApi(config);
            toast.success(res?.data?.msg, {
                position: "top-center",
                duration: 4000,
            })


            var jsonString = JSON.stringify(res?.data?.user);
            localStorage.setItem("loginInfo", jsonString);
            dispatch(setData(res?.data?.user));
            dispatch(setIsLogin(true));
            setLoading(false);
            navigate("/")
        } catch (err) {
            setLoading(false);
            toast.error(err?.response?.data.msg, {
                position: "top-center",
                duration: 4000,
            });
        }

    };


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh', width: '100%', flexDirection: 'column', gap: '32px' }}>
            <Paper elevation={2} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "60vh", width: "100%", maxWidth: "500px" }}>
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

                    <button type="submit" style={{ height: "40px", backgroundColor: "#2fda24", width: "80%", maxWidth: "30vh", color: "white" }}>
                        {
                            loading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Login"
                        }
                    </button>
                </form>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}} className='loginBottom'>
                    <button style={{ padding: "8px" }} onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
                    <button style={{ padding: "8px" }} onClick={() => navigate("/create-account")}>Don't have an account?</button>
                </div>
                <div>
                    <button className='asGuest' onClick={() => navigate("/as-guest")}>
                        Continue as Guest
                    </button>
                </div>
            </Paper>
        </div>
    );
}

export default Login;
