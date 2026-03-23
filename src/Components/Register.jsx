import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register(){

const navigate = useNavigate();
//Instead of writing usestate for each seperate field, we combined it like this.
const [formData,setFormData] = useState({
  fullName:"",
  userName:"",
  email:"",
  password:""
});

const [loading,setloading]=useState(false);

//Taking input from user
  function handlechange(e){
    setFormData({
      ...formData,
//sqaure brackets are used to get the value dynamically
      [e.target.name]:e.target.value
    });
  };
  
const handleSubmit=async(e)=>{
  e.preventDefault();

  if(!formData.fullName || !formData.userName || !formData.email || !formData.password){
    alert("All fields are required");
    return;
  }

try {
  setloading(true);

  const res=await API.post("/register",formData);
  alert("Registration successfull! Check your email");
  navigate("/");

} catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || "something went wrong!") ; 
  
}finally{
  setloading(false);
}
};

  return(
    <div>
      <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullname">Full Name:</label>
      <input type="text" id="fullname" name="fullName" placeholder="Enter Your Full Name" onChange={handlechange} required/>

      <label htmlFor="username">User Name:</label>
      <input type="text" id="username" name="userName" placeholder="Enter Your User Name" onChange={handlechange} required/>

       <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter Your Email" onChange={handlechange} required/>

       <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter Your Password" onChange={handlechange} required/>

      <button type="submit">{loading ? "Creating..." : "Sign Up"}</button>
    </form>
    </div>
  )
}

export default Register;