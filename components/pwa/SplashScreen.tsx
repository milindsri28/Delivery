"use client"

import { useEffect, useState } from "react"
import { ChefHat, Utensils } from "lucide-react"

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Food icons floating */}
        <Utensils
          className="absolute top-1/4 left-1/4 w-8 h-8 text-white animate-bounce"
          style={{ animationDelay: "1.5s" }}
        />
        <ChefHat
          className="absolute bottom-1/3 right-1/4 w-10 h-10 text-white animate-bounce"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* App icon */}
        <div className="mb-8 animate-bounce">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
            <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-fadeIn">Spice Delight</h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-orange-100 mb-12 animate-slideInUp max-w-md mx-auto">
          Authentic Indian Cuisine Delivered Fresh
        </p>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <div
              className="bg-white rounded-full h-2 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/80 text-sm">Preparing your feast... {progress}%</p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  )
}
