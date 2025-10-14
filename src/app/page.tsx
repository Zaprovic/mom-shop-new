import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Sparkles,
  Heart,
  Star,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              GlowBeauty
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              Skincare
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              Makeup
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-100">
              New Collection 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Natural Glow
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Premium beauty and skincare products crafted with natural
              ingredients. Transform your daily routine into a luxurious
              self-care ritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Collection
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Happy Customers
                </p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Natural Products
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900 p-8 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-24 w-24 mx-auto text-pink-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Hero Image Placeholder
                </p>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-bold">4.9</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our curated collections
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Skincare",
              icon: "✨",
              color: "from-pink-400 to-rose-400",
            },
            {
              name: "Makeup",
              icon: "💄",
              color: "from-purple-400 to-pink-400",
            },
            {
              name: "Haircare",
              icon: "💆‍♀️",
              color: "from-blue-400 to-cyan-400",
            },
            {
              name: "Fragrance",
              icon: "🌸",
              color: "from-amber-400 to-orange-400",
            },
          ].map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-all"
            >
              <CardContent className="p-6">
                <div
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${category.color} mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-center">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-3xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Bestsellers</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Most loved by our customers
            </p>
          </div>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Radiant Glow Serum", price: "$45", badge: "Best Seller" },
            { name: "Hydrating Face Cream", price: "$38", badge: "New" },
            { name: "Vitamin C Cleanser", price: "$28", badge: "Trending" },
            { name: "Anti-Aging Night Oil", price: "$52", badge: "Popular" },
          ].map((product, i) => (
            <Card
              key={i}
              className="group cursor-pointer hover:shadow-xl transition-all"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-t-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <Sparkles className="h-16 w-16 text-pink-400 group-hover:scale-110 transition-transform" />
                  <Badge className="absolute top-3 right-3 bg-white text-pink-600">
                    {product.badge}
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(124)</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-pink-600">
                      {product.price}
                    </span>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Premium Quality",
              description:
                "Only the finest natural ingredients in every product",
            },
            {
              icon: <Heart className="h-8 w-8" />,
              title: "Cruelty-Free",
              description: "All products are ethically sourced and tested",
            },
            {
              icon: <Sparkles className="h-8 w-8" />,
              title: "Visible Results",
              description: "See the difference in just 7 days or money back",
            },
          ].map((benefit, i) => (
            <Card key={i} className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-pink-500 to-purple-600 border-none text-white">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Our Beauty Community
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Get exclusive access to new products, special offers, and beauty
              tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">GlowBeauty</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Premium beauty and skincare products for your natural glow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Skincare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Makeup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Haircare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Fragrance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-500">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 GlowBeauty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
