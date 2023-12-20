import React, { useState, useRef, useEffect } from 'react'
// import commonData from "../../common-data/Common.json"
import { Avatar, IconButton, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import Colors from "../../common-data/Colors.json"
import toast from 'react-hot-toast';
import { CreateStatusApi } from '../../api/post/CreateStatusApi';
import { MdOutlineClose } from "react-icons/md";
import {CircularProgress} from '@mui/material';

function AllStatus(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [colorIndex, setColorIndex] = useState(0)
    const [statusColor, setStatusColor] = useState(Colors[colorIndex].color)
    const [createStatus, setCreateStatus] = useState(false)
    const [currentHashValue, setCurrentHashValue] = useState(id);


    let mappingInd = -1;
    const containerRef = useRef(null);

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            // Calculate the index of the snap based on scroll position
            const scrollTop = container?.scrollTop;
            const snapHeight = container?.clientHeight; // Adjust based on your snap height
            const index = Math.floor(scrollTop / snapHeight);

            let divElement = document.getElementById(index);
            if (divElement) {
                setCurrentHashValue(divElement.getAttribute("data-custom"))
            }

        }
    };

    const hashValueRef = useRef(currentHashValue);  // Store hash value in a ref

    useEffect(() => {
      hashValueRef.current = currentHashValue;  // Update ref when hash value changes
    }, [currentHashValue]);
    useEffect(() => {
        const calling = () => {
            console.log("calling")
          const element = document.querySelector(`[data-custom="${hashValueRef.current}"]`);
                var ind = 0;
                if (element) {
                    ind = element.getAttribute("id")
                }
                const container = containerRef.current;
                container.scrollTop = container?.clientHeight * ind;

                if (container) {
                    // Attach the scroll event listener
                    container.addEventListener('scroll', handleScroll);
                    // Clean up the event listener on component unmount
                    return () => {
                        container.removeEventListener('scroll', handleScroll);
                    };
                }
            }
        
    setTimeout(calling, 1000);
  }, []);

    useEffect(() => {

        navigate(`/status/${currentHashValue}`)
    }, [currentHashValue, navigate])

    const handleChangeStatus = (ind) => {
        let value = props?.statusData?.[ind]?.status[0]?._id;
        if (value) {
            let element = document.querySelector(`[data-custom="${value}"]`);
            let idd = 0;
            if (element) {
                idd = element.getAttribute("id")
            }
            const container = containerRef.current;
            container.scrollTop = container?.clientHeight * idd;
            navigate(`/status/${value}`)
        }
    }

    var loginInfo = localStorage.getItem('loginInfo');
    loginInfo = JSON.parse(loginInfo);


    const handleChangeColor = () => {
        if (colorIndex < Colors.length - 1) {
            setColorIndex(colorIndex + 1)
            setStatusColor(Colors[colorIndex + 1].color)
        } else {
            setColorIndex(0)
            setStatusColor(Colors[0].color)
        }
    }


    const [statusImg, setStatusImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const handleUploadStatusImg = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        setStatusImg(e.target.files[0]);
    }


    const uploadStatus = async (e) => {
        if (!statusImg) return toast.error('Please select a file');
        const form = new FormData();
        form.append('img', statusImg);
        props.setLoading(true);
        setStatusImg(null);
        try {
            const res = await CreateStatusApi(form, statusColor);
            setCreateStatus(false);
            props.setLoading(false);
            toast.success('Status uploaded successfully');
            navigate(`/status/${res?.data?._id}`)
        } catch (err) {
            props.setLoading(false);
            toast.error(err?.response?.data?.msg);
        }
    }

    return (
        <div className='status'>
            {props?.componentLoading ? <CircularProgress /> :
                <>
                <div className='statusList'>
                <div style={{ color: "white", fontSize: "30px", display: "flex", alignItems: "center", border: "none", borderRadius: "50%", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "black", cursor: "pointer" }}>
                    <IoMdArrowRoundBack onClick={() => navigate("/")} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                    <button onClick={() => { navigate('/status/create'); setCreateStatus(true)}} >
                        <div style={{ color: "white", fontSize: "30px", display: "flex", alignItems: "center", border: "2px solid black", borderRadius: "50%", justifyContent: "center", width: "50px", height: "50px", backgroundColor: "black", cursor: "pointer" }}>
                            <IoIosAddCircleOutline />
                        </div>
                    </button>
                    {props?.statusData?.map((data, ind) => {
                        return (
                            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }} id={data?.id}>
                                <IconButton style={{ margin: "0px", padding: "0px", border: ind === id ? "5px solid white" : "" }} onClick={() => handleChangeStatus(ind)}>
                                    <Avatar src={data?.userId?.profilePic} alt="user" style={{ border: "2px solid white" }} />
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
                <div>
                </div>
            </div>
            <div className='statusFrame' ref={containerRef} >
                {createStatus ? <>
                    <div className='frames' style={{ backgroundColor: statusColor }}>
                        <div className='frameNav' style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%", padding: "20px", justifyContent: "space-between",backgroundColor: "white" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                <Avatar src={loginInfo?.profilePic} alt="user" style={{ border: "2px solid white", backgroundColor: "white" }} />
                                <p style={{ fontWeight: "600", color: "black" }}>{loginInfo?.name}</p>
                            </div>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                                <button onClick={handleChangeColor} style={{ backgroundColor: colorIndex === Colors.length - 1 ? Colors[0].color : Colors[colorIndex + 1].color, height: "40px", width: "40px", borderRadius: "50%", border: "2px solid white", color: "black" }}>i</button>
                                <button style={{ backgroundColor: colorIndex === Colors.length - 1 ? Colors[0].color : Colors[colorIndex + 1].color, height: "40px", width: "40px", borderRadius: "50%", border: "2px solid white", color: "black",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={() => setCreateStatus(false)}>
                                    <MdOutlineClose />
                                </button>
                           </div>
                        </div>
                        <div>
                            {statusImg === null ?
                                <div class="input-div">
                                    <input
                                        style={{ zIndex: "9999" }}
                                        class="input"
                                        type="file"
                                        id='uploadStatus'
                                        accept='image/*'
                                        inputProps={{
                                            accept: 'image/*',
                                        }}
                                        onChange={handleUploadStatusImg} />
                                    <svg
                                        style={{ zIndex: "1" }}
                                        htmlFor="uploadStatus"
                                        inputProps={{
                                            accept: 'image/*',
                                        }}
                                        xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                                </div>
                                :
                                <img src={previewImg} alt="" />
                            }
                        </div>
                        <div style={{ padding: "40px" }}>
                            <Button variant="outlined" style={{ backgroundColor: "white" }} onClick={uploadStatus}>
                                {props.loading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </div>
                    </div>
                </> :
                    <>
                        {props?.statusData?.map((data, ind) => (
                            <>
                                {data?.status?.map((status) => {
                                    mappingInd = mappingInd + 1
                                    return (
                                        <>
                                            <div data-custom={`${status?._id}`} className='frames' style={{ backgroundColor: status?.color }} id={mappingInd}>
                                                <div className='frameNav' style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%", padding: "20px", backgroundColor: "white" }}>
                                                    <Avatar src={status?.userId?.profilePic} alt="user" style={{ border: "2px solid white" }} />
                                                    <p style={{ fontWeight: "600" }}>{status?.userId?.name}</p>
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <div className="frameBody" style={{ backgroundColor: data?.color }}>
                                                        <img
                                                            src={status?.imageUrl}
                                                            alt=""
                                                            style={{
                                                                objectFit: 'cover',
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* <input type="text" /> */}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        ))}
                    </>
                }

            </div>
            </>}
        </div>
    )
}

export default AllStatus