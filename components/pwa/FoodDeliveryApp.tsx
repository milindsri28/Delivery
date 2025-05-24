"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Banner from "@/components/home/banner"
import Categories from "@/components/home/categories"
import FeaturedItems from "@/components/home/featured-items"

export default function FoodDeliveryApp() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Banner />
          <Categories />
          <FeaturedItems />
        </div>
      </main>
      <Footer />
    </div>
  )
}
