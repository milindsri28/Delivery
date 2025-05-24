"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChefHat, ArrowLeft, RotateCcw, CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OTPVerificationScreenProps {
  phoneNumber: string
  onVerified: () => void
  onBack: () => void
}

export default function OTPVerificationScreen({ phoneNumber, onVerified, onBack }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Mock OTP for demo (in real app, this would come from Firebase)
  const mockOTP = "123456"

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all digits are entered
    if (newOtp.every((digit) => digit !== "") && newOtp.join("") === mockOTP) {
      handleVerifyOTP(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async (otpValue: string) => {
    setIsLoading(true)

    // Mock verification delay
    setTimeout(() => {
      if (otpValue === mockOTP) {
        setIsVerified(true)
        setTimeout(() => {
          onVerified()
        }, 1500)
      } else {
        // Reset OTP on wrong entry
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleResendOTP = () => {
    setTimer(30)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()

    // Restart timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleManualVerify = () => {
    const otpValue = otp.join("")
    if (otpValue.length === 6) {
      handleVerifyOTP(otpValue)
    }
  }

  const isOTPComplete = otp.every((digit) => digit !== "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-8 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-40 right-12 w-24 h-24 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-4 w-16 h-16 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-12 pb-8 px-6 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <ChefHat className="w-5 h-5 text-orange-500" />
          </div>
          <h1 className="text-xl font-bold text-white">Spice Delight</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Verification text */}
          <div className="text-center mb-8">
            {isVerified ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Verified!</h2>
                <p className="text-white/90 text-lg">Welcome to Spice Delight</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Verify Your Number</h2>
                <p className="text-white/90 text-lg">We've sent a 6-digit code to</p>
                <p className="text-white font-semibold text-xl">+91 {phoneNumber}</p>
              </div>
            )}
          </div>

          {!isVerified && (
            <>
              {/* OTP input */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-6">
                <div className="space-y-6">
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ""))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold text-gray-900 bg-white rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-200"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  {/* Demo hint */}
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-2">Demo OTP for testing:</p>
                    <p className="text-white font-mono text-lg bg-white/20 rounded-lg py-2 px-4 inline-block">
                      {mockOTP}
                    </p>
                  </div>

                  {/* Verify button */}
                  <Button
                    onClick={handleManualVerify}
                    disabled={!isOTPComplete || isLoading}
                    className="w-full py-6 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-50 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </div>
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="font-medium">Resend OTP</span>
                  </button>
                ) : (
                  <p className="text-white/80">
                    Resend OTP in <span className="font-semibold">{timer}s</span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
}
