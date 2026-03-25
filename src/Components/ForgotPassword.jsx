import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      const res=await API.post("/forgot-password/request",{email});
      alert("Password reset link sent to your email!");

    } catch (error) {
      console.log(res?.data);
      alert(res?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>

          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;