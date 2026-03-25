import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../services/api";


function ResetPassword(){
  
  const { rawToken } = useParams();
  const navigate=useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res=await API.post(`/forgot-password/${rawToken}`,{ newPassword });
      alert("Reset Password Successfull");
      navigate("/dashboard");

    } catch (error) {
      console.log(res?.data);
      alert(res?.data?.message || "Error in Resetting Password!");
    }finally{
      setLoading(false);
    }
  }



    return(
    <>
    <h1>Reset Password</h1>
    <form onSubmit={handleSubmit}>

      <label>New Password:</label>
      <input
       type="password" 
       required  
       value={newPassword}
       onChange={(e) => setNewPassword(e.target.value)}
       />
      <button type="submit" disabled={loading}>
        {loading ? "Changing Password..." : "Reset Password"}
      </button>
    </form>
    </>
  )
}

export default ResetPassword;