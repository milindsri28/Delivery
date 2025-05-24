"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChefHat, ArrowLeft, CheckCircle, RotateCcw, User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SignupOTPScreenProps {
  phoneNumber: string
  userInfo: { name: string; email: string }
  onVerified: () => void
  onBack: () => void
}

export default function SignupOTPScreen({ phoneNumber, userInfo, onVerified, onBack }: SignupOTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all digits are entered
    if (newOtp.every((digit) => digit !== "") && !isVerifying) {
      verifyOTP(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const verifyOTP = async (otpCode: string) => {
    setIsVerifying(true)
    setError("")

    // Mock verification delay
    setTimeout(() => {
      if (otpCode === "123456") {
        setIsVerified(true)
        setTimeout(() => {
          onVerified()
        }, 1500)
      } else {
        setError("Invalid OTP. Please try again.")
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
      setIsVerifying(false)
    }, 2000)
  }

  const handleManualVerify = () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      verifyOTP(otpCode)
    }
  }

  const handleResendOTP = () => {
    if (!canResend) return

    setCanResend(false)
    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()

    // Start timer again
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setTimeout(() => clearInterval(timer), 30000)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Account Created!</h2>
          <p className="text-white/90 text-lg mb-2">Welcome to Spice Delight, {userInfo.name}!</p>
          <p className="text-white/80">Redirecting to your delicious journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-8 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-40 right-12 w-24 h-24 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-8 px-6 relative z-10">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Spice Delight</h1>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Verify Your Account</h2>
            <p className="text-white/90 text-lg mb-2">We've sent a 6-digit code to</p>
            <p className="text-white font-semibold text-xl">+91 {phoneNumber}</p>
          </div>

          {/* User Info Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4">Account Details:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-white/70" />
                <span className="text-white">{userInfo.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white">{userInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/70" />
                <span className="text-white">+91 {phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* OTP Input */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-6">
            <div className="space-y-6">
              {/* Demo OTP display */}
              <div className="bg-orange-100 border border-orange-300 rounded-2xl p-4 text-center">
                <p className="text-orange-800 font-medium">Demo OTP: 123456</p>
                <p className="text-orange-600 text-sm">Use this code for testing</p>
              </div>

              {/* OTP inputs */}
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-16 text-2xl font-bold text-gray-900 text-center bg-white border-2 border-transparent rounded-2xl focus:border-orange-300 focus:outline-none transition-colors"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>

              {/* Error message */}
              {error && (
                <div className="text-center">
                  <p className="text-red-200 font-medium">{error}</p>
                </div>
              )}

              {/* Verify button */}
              <Button
                onClick={handleManualVerify}
                disabled={otp.some((digit) => !digit) || isVerifying}
                className="w-full py-6 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-50 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isVerifying ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-white/80 mb-2">Didn't receive the code?</p>
                <button
                  onClick={handleResendOTP}
                  disabled={!canResend}
                  className="text-white font-semibold underline hover:text-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="text-center">
            <p className="text-white/70 text-sm">
              By verifying, you confirm that you own this mobile number and agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
}
