"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Truck, Clock, Star } from "lucide-react"

interface WelcomeScreensProps {
  onComplete: () => void
}

const welcomeData = [
  {
    id: 1,
    icon: Star,
    title: "Authentic Indian Flavors",
    description:
      "Experience the rich taste of traditional Indian cuisine prepared by expert chefs using authentic spices and recipes passed down through generations.",
    color: "from-orange-500 to-red-600",
    image: "/images/banner.png",
  },
  {
    id: 2,
    icon: Clock,
    title: "Fast & Fresh Delivery",
    description:
      "Get your favorite dishes delivered hot and fresh to your doorstep in just 30-45 minutes. We ensure quality and speed in every order.",
    color: "from-red-500 to-pink-600",
    image: "/images/categories/main-course.png",
  },
  {
    id: 3,
    icon: Truck,
    title: "Order Anytime, Anywhere",
    description:
      "Browse our extensive menu, customize your order, and track delivery in real-time. Enjoy restaurant-quality food from the comfort of your home.",
    color: "from-pink-500 to-purple-600",
    image: "/images/items/chicken-biryani.png",
  },
]

export default function WelcomeScreens({ onComplete }: WelcomeScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const nextScreen = () => {
    if (currentScreen < welcomeData.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      onComplete()
    }
  }

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const goToScreen = (index: number) => {
    setCurrentScreen(index)
  }

  const currentData = welcomeData[currentScreen]
  const IconComponent = currentData.icon

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentData.color} flex flex-col relative overflow-hidden`}>
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

      {/* Skip button */}
      <div className="absolute top-8 right-4 z-20">
        <button
          onClick={onComplete}
          className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center relative z-10">
        {/* Icon */}
        <div className="mb-8 animate-slideInUp">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
            <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideInLeft max-w-4xl">
          {currentData.title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 mb-12 animate-slideInRight max-w-2xl leading-relaxed">
          {currentData.description}
        </p>

        {/* Feature highlight */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto animate-fadeIn">
          <div className="flex items-center justify-center space-x-4">
            {currentScreen === 0 && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-white/80 text-sm">Dishes</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.8★</div>
                  <div className="text-white/80 text-sm">Rating</div>
                </div>
              </>
            )}
            {currentScreen === 1 && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">30-45</div>
                  <div className="text-white/80 text-sm">Minutes</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹49</div>
                  <div className="text-white/80 text-sm">Delivery</div>
                </div>
              </>
            )}
            {currentScreen === 2 && (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/80 text-sm">Available</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Live</div>
                  <div className="text-white/80 text-sm">Tracking</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex space-x-3 mb-8">
          {welcomeData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToScreen(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentScreen ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6 md:p-8 relative z-10">
        {/* Previous button */}
        <button
          onClick={prevScreen}
          disabled={currentScreen === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            currentScreen === 0 ? "text-transparent cursor-not-allowed" : "text-white hover:bg-white/10 active:scale-95"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Next/Get Started button */}
        <button
          onClick={nextScreen}
          className="flex items-center space-x-2 bg-white text-gray-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span>{currentScreen === welcomeData.length - 1 ? "Start Ordering" : "Next"}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
}
