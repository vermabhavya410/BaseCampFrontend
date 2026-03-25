import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";


function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };


  async function login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/login", formData);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h1>Login</h1>
      <form>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit" onClick={login}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </>
  )
}

export default Login;