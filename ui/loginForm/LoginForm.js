"use client";
import React, { useState } from "react";
import classes from "./loginForm.module.css";
import Link from "next/link";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally make an API call to authenticate
      // For demo purposes, we'll just simulate success
      console.log("Login successful", formData);

      // Redirect to dashboard or home page after successful login
      // window.location.href = "/";
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.loginFormContainer}>
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
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
            name="password"
            value={formData.password}
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
