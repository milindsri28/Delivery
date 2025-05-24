"use client"

import { useState } from "react"
import LoginScreen from "./LoginScreen"
import SignupScreen from "./SignupScreen"
import SignupOTPScreen from "./SignupOTPScreen"
import OTPVerificationScreen from "./OTPVerificationScreen"

interface AuthScreensProps {
  onComplete: () => void
}

export default function AuthScreens({ onComplete }: AuthScreensProps) {
  const [currentStep, setCurrentStep] = useState<"login" | "signup" | "signup-otp" | "login-otp">("login")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userInfo, setUserInfo] = useState({ name: "", email: "" })

  const handleLoginSubmit = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentStep("login-otp")
  }

  const handleSignupSubmit = (phone: string, name: string, email: string) => {
    setPhoneNumber(phone)
    setUserInfo({ name, email })
    setCurrentStep("signup-otp")
  }

  const handleSignupOTPVerified = () => {
    // Complete signup process and redirect to app
    onComplete()
  }

  const handleLoginOTPVerified = () => {
    // Complete login process and redirect to app
    onComplete()
  }

  const handleBackToAuth = () => {
    setCurrentStep("login")
    setPhoneNumber("")
    setUserInfo({ name: "", email: "" })
  }

  const handleBackToSignup = () => {
    setCurrentStep("signup")
  }

  const handleSwitchToSignup = () => {
    setCurrentStep("signup")
  }

  const handleSwitchToLogin = () => {
    setCurrentStep("login")
  }

  if (currentStep === "login") {
    return <LoginScreen onSubmit={handleLoginSubmit} onSwitchToSignup={handleSwitchToSignup} />
  }

  if (currentStep === "signup") {
    return <SignupScreen onSubmit={handleSignupSubmit} onSwitchToLogin={handleSwitchToLogin} />
  }

  if (currentStep === "signup-otp") {
    return (
      <SignupOTPScreen
        phoneNumber={phoneNumber}
        userInfo={userInfo}
        onVerified={handleSignupOTPVerified}
        onBack={handleBackToSignup}
      />
    )
  }

  if (currentStep === "login-otp") {
    return (
      <OTPVerificationScreen phoneNumber={phoneNumber} onVerified={handleLoginOTPVerified} onBack={handleBackToAuth} />
    )
  }

  return null
}
