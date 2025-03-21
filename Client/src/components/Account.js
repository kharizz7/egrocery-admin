import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";


const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isSignUp, setIsSignUp] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation validation
    if (isSignUp && password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const url = isSignUp 
      ? "http://localhost:3000/api/signup" 
      : "http://localhost:3000/api/signin";
  
    const requestData = isSignUp 
      ? { email, password, username, confirmPassword }  
      : { email, password }; 

    try {
      const response = await axios.post(url, requestData);

      setSuccessMessage(isSignUp ? "User created successfully!" : "Sign-in successful!");
      setErrorMessage(""); // Clear errors if success

     
if (response.data.token) {
  dispatch(setUser({
    user: {
      username: response.data.username,
      email: response.data.email,
    },
    token: response.data.token,
  }));
}

      setTimeout(() => navigate("/profile"), 1500);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Sign Up" : "Sign In"}</h1>

        {/* Display Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Display Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Show 'Proceed to Home' button after success */}
        {successMessage && (
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Proceed to Home
          </button>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setSuccessMessage("");
                setErrorMessage(""); // Clear messages on toggle
              }}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
