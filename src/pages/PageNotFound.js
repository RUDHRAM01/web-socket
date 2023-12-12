import React from 'react'
import NotFound from "../assests/notFound.png"
import { useNavigate } from 'react-router-dom'


function PageNotFound() {
    const navigate = useNavigate();
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    const handlePageChange = () => {
        if (data) {
            navigate("/")
        } else {
            navigate("/login")
       }
    }
  return (
      <div style={{display:'flex',alignItems:"center",justifyContent:"center",height:"100vh",width:"100%",flexDirection:"column"}}>
          <img src={NotFound} alt="404" style={{ height: "200px", width: "400px", maxWidth: "90%" }} />
          <button
                onClick={handlePageChange}
                style={{
                    backgroundColor: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginLeft: "8px"
                }}
          >
              Home
          </button>
    </div>
  )
}

export default PageNotFound