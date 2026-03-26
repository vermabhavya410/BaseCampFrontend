import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ChangePassword() {
  const navigate=useNavigate();
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  async function PasswordChange(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/change-password", formData);
      alert("Password Changed successfully!");
     
      setFormData({
        currentPassword: "",
        newPassword: ""
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={PasswordChange}>
      <h2>Change Password</h2>
      <label htmlFor="currentPassword">Current Password</label>
      <input
       type="password"
        id="oldPassword"
         name="oldPassword" 
         required
         value={formData.oldPassword || ""}
          onChange={handleInput} 
          />

      <label>New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword || ""}
        required
        onChange={handleInput}
      />

      <button type="submit" disabled={Loading}>
        {Loading ? "Changing..." : "Change Password"}
      </button>
    

    </form>
  )
}

export default ChangePassword;