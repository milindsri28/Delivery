"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/pwa/SplashScreen"
import WelcomeScreens from "@/components/pwa/WelcomeScreens"
import AuthScreens from "@/components/auth/AuthScreens"
import FoodDeliveryApp from "@/components/pwa/FoodDeliveryApp"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "welcome" | "auth" | "app">("splash")

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("spice-delight-auth-token")
    const hasSeenWelcome = localStorage.getItem("spice-delight-welcome-seen")

    if (isAuthenticated) {
      // Skip directly to app after splash if already authenticated
      const splashTimer = setTimeout(() => {
        setCurrentScreen("app")
      }, 5000)
      return () => clearTimeout(splashTimer)
    } else if (hasSeenWelcome) {
      // Skip to auth if welcome screens have been seen
      const splashTimer = setTimeout(() => {
        setCurrentScreen("auth")
      }, 5000)
      return () => clearTimeout(splashTimer)
    } else {
      // Show welcome screens after splash for new users
      const splashTimer = setTimeout(() => {
        setCurrentScreen("welcome")
      }, 5000)
      return () => clearTimeout(splashTimer)
    }
  }, [])

  const handleWelcomeComplete = () => {
    localStorage.setItem("spice-delight-welcome-seen", "true")
    setCurrentScreen("auth")
  }

  const handleAuthComplete = () => {
    localStorage.setItem("spice-delight-auth-token", "authenticated")
    setCurrentScreen("app")
  }

  if (currentScreen === "splash") {
    return <SplashScreen />
  }

  if (currentScreen === "welcome") {
    return <WelcomeScreens onComplete={handleWelcomeComplete} />
  }

  if (currentScreen === "auth") {
    return <AuthScreens onComplete={handleAuthComplete} />
  }

  return <FoodDeliveryApp />
}
