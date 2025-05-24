"use client"

import type React from "react"

import { useState } from "react"
import { ChefHat, Phone, ArrowRight, Shield, Clock, Star, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SignupScreenProps {
  onSubmit: (phoneNumber: string, name: string, email: string) => void
  onSwitchToLogin: () => void
}

export default function SignupScreen({ onSubmit, onSwitchToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    // Mock Firebase OTP sending delay
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(formData.phoneNumber, formData.name, formData.email)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isValidPhone = formData.phoneNumber.length === 10 && /^\d+$/.test(formData.phoneNumber)
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  const isValidName = formData.name.trim().length >= 2
  const isFormValid = isValidPhone && isValidEmail && isValidName

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
      <div className="flex items-center justify-center pt-12 pb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Spice Delight</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Welcome text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Spice Delight!</h2>
            <p className="text-white/90 text-lg">Create your account to start ordering amazing food</p>
          </div>

          {/* Signup form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <div className="space-y-2">
                <label className="text-white font-medium text-sm">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full pl-14 pr-4 py-6 text-lg text-gray-900 bg-white border-0 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none placeholder:text-gray-500"
                  />
                </div>
                {formData.name.length > 0 && !isValidName && (
                  <p className="text-orange-200 text-sm">Name must be at least 2 characters</p>
                )}
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label className="text-white font-medium text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-14 pr-4 py-6 text-lg text-gray-900 bg-white border-0 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none placeholder:text-gray-500"
                  />
                </div>
                {formData.email.length > 0 && !isValidEmail && (
                  <p className="text-orange-200 text-sm">Please enter a valid email address</p>
                )}
              </div>

              {/* Phone input */}
              <div className="space-y-2">
                <label className="text-white font-medium text-sm">Mobile Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "")
                      if (value.length <= 10) {
                        handleInputChange("phoneNumber", value)
                      }
                    }}
                    className="w-full pl-20 pr-4 py-6 text-lg text-gray-900 bg-white border-0 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none placeholder:text-gray-500"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                {formData.phoneNumber.length > 0 && !isValidPhone && (
                  <p className="text-orange-200 text-sm">Please enter a valid 10-digit mobile number</p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full py-6 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-50 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Send OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-white/80 text-sm">
              <Shield className="w-4 h-4" />
              <span>We'll send an OTP to verify your mobile number</span>
            </div>
          </div>

          {/* Switch to login */}
          <div className="mt-6 text-center">
            <p className="text-white/80">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-white font-semibold underline hover:text-white/90 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Fast Delivery</p>
              <p className="text-white/70 text-xs">30-45 mins</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Top Rated</p>
              <p className="text-white/70 text-xs">4.8★ Rating</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium">Secure</p>
              <p className="text-white/70 text-xs">Safe Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="text-center pb-8 px-6 relative z-10">
        <p className="text-white/70 text-sm">
          By creating an account, you agree to our{" "}
          <span className="text-white underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-white underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
}
