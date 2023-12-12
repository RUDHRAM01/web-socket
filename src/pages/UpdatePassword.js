import { Typography, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import Img from "../assests/search.gif"
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { UpdatePasswordApi } from '../api/post/ForgotPassword';
import { GreetingMessageApi } from '../api/post/GreetingMessage';


function UpdatePassword() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const greetingMessage = async () => {
            try {
                const res = await GreetingMessageApi({ id });
                toast.success(res?.data?.msg, {
                    position: "top-center",
                    duration: 4000,
                })
            } catch (err) {
                toast.error(err?.response?.data?.msg, {
                    position: "top-center",
                    duration: 2000,
                });
                setTimeout(() => {
                    toast.success("you will automatically redirect to the login page", {
                        position: "top-center",
                        duration: 2000,
                    })
                }, 2000)
                setTimeout(() => {
                    navigate("/login");
                }, 2000)
            }
        }
        greetingMessage();
    }, [id,navigate])

    const [config, setConfig] = useState({
        password: "",
        id: id
    });

    const [loading, setLoading] = useState(false);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await UpdatePasswordApi(config);
            toast.success(res?.data?.msg, {
                position: "top-center",
                duration: 4000,
            })
            setLoading(false);
            setTimeout(() => {
                navigate("/login");
            }, 2000)
        }catch(err) {
            setLoading(false);
            toast.error(err?.response?.data?.msg, {
                position: "top-center",
                duration: 4000,
            })
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh', width: '100%', flexDirection: 'column', gap: '32px' }}>
            <Paper elevation={2} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "60vh", width: "100%", maxWidth: "500px" }}>
                <img src={Img} alt="" style={{ height: "80px" }} />
                <Typography variant="h4" style={{ padding: "16px",textAlign:"center" }}>Update Password</Typography>
                <form onSubmit={handleUpdate} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', gap: '8px' }}>
                    <input onChange={(e) => {
                        setConfig((value) => ({
                            ...value,
                            password: e.target.value
                        }));
                    }}
                        value={config.password}
                        type="password" placeholder="Password" required style={{ height: '40px', maxWidth: '40vh', width: '90%', padding: "4px", border: "1px solid gray" }} />

                    <button type="submit" style={{ height: "40px", backgroundColor: "#2fda24", width: "80%", maxWidth: "30vh", color: "white" }}>
                        {
                            loading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Update Password"
                        }
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default UpdatePassword;
