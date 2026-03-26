import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import API from "../services/api";

function VerifyEmail(){
  const {rawToken} = useParams();
  const navigate = useNavigate();
  const [Loading,setLoading] = useState(false);
  
 useEffect(() => {
    const verify = async () => {
      try {
        await API.get(`/verify-email/${rawToken}`);
        alert("Email verified successfully! You can now log in.");
        navigate("/login"); // redirect to login
      } catch (error) {
        console.log(error);
        alert("Email verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [rawToken, navigate]);

  return(
    <>
    <div>
      {Loading ? <p>Verifying your email...</p> : <p>Done!</p>}
    </div>
    </>
  )
}

export default VerifyEmail;