"use client";
import React, { useState, useEffect } from "react";
import classes from "./loginForm.module.css";
import Link from "next/link";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: "",
    user_pwd: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   // Check if there's a token in the cookies
  //   const token = Cookies.get("jwt");
  //   if (token) {
  //     // If a token exists, check if there's a stored user
  //     const storedUser = Cookies.get("user");
  //     if (storedUser) {
  //       // Redirect to dashboard or home page
  //       router.push("/");
  //     }
  //   }
  // }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.user_id || !formData.user_pwd) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Make API call to backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/users/login`, formData);

      const data = await response.data;

      // Success - store token in cookie
      const expirationDate = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

      Cookies.set("jwt", data.token, { expires: expirationDate });
      
      // Store user data in localStorage
      Cookies.set("user", JSON.stringify(data.data.user), { expires: expirationDate });

      // Show success toast
      toast.success("Login successful!");

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginFormContainer}>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className={classes.formHeader}>
        <h1>Welcome Back</h1>
        <p>Sign in to continue to XWMS</p>
      </div>

      {error && <div className={classes.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <div className={classes.inputGroup}>
          <div className={classes.inputIcon}>
            <FiUser />
          </div>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="Username or Email"
            className={classes.formInput}
            disabled={isLoading}
          />
        </div>

        <div className={classes.inputGroup}>
          <div className={classes.inputIcon}>
            <FiLock />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="user_pwd"
            value={formData.user_pwd}
            onChange={handleChange}
            placeholder="Password"
            className={classes.formInput}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={classes.passwordToggle}
            disabled={isLoading}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className={classes.formOptions}>
          <div className={classes.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={toggleRememberMe}
              className={classes.checkbox}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link href="/forgot-password" className={classes.forgotPassword}>
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className={classes.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className={classes.signupPrompt}>
          <span>{`Don't have an account?`}</span>
          <Link href="/signup" className={classes.signupLink}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
