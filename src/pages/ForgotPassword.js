import { Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import Img from "../assests/search.gif"
import toast from 'react-hot-toast';
import { CircularProgress, Button } from '@mui/material';
import { VerifyEmailApi } from '../api/post/VerifyEmail';
import { useNavigate } from 'react-router-dom';



function ForgotPassword() {
    const navigate = useNavigate();
    const [config, setConfig] = useState({
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await VerifyEmailApi(config);
            toast.success(res?.data?.msg, {
                position: "top-center",
                duration: 4000,
            })
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(err?.response?.data.msg, {
                position: "top-center",
                duration: 4000,
            });
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh', width: '100%', flexDirection: 'column', gap: '32px' }}>
            <Paper elevation={2} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "60vh", width: "100%", maxWidth: "500px" }}>
                <img src={Img} alt="" style={{ height: "80px" }} />
                <Typography variant="h4" style={{ padding: "16px", textAlign: "center" }}>Forgot Password</Typography>
                <form onSubmit={handleForgot} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', gap: '8px' }}>
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            email: e.target.value
                        }));
                    }}
                        value={config.email}
                        type="email" placeholder="Email" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />

                    <button type="submit" style={{ height: "40px", backgroundColor: "#2fda24", width: "80%", maxWidth: "30vh", color: "white" }}>
                        {
                            loading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Send Email"
                        }
                    </button>
                    <Button variant="text" onClick={() => navigate("/login")}>
                        Already have an account?
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default ForgotPassword;
