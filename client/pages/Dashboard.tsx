import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NotificationBadge from "@/components/NotificationBadge";
import {
  Search,
  Bell,
  MapPin,
  Filter,
  Star,
  MessageCircle,
  Calendar,
  List,
  User,
  Home,
} from "lucide-react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Popular", active: true },
    { name: "Futsal", active: false },
    { name: "Cricket", active: false },
    { name: "Badminton", active: false },
  ];

  const venues = [
    {
      id: 1,
      name: "Kanzul Sport Complex",
      image:
        "https://caavl.com/storage/files/lk/1926/thumb-816x460-487a8ca23f14c980894df937a151e030.jpg",
      rating: 4.5,
      reviews: 1240,
      address: "6315 N. Warana Road Thihariya",
      prices: ["LKR.1300/h", "LKR.700/h", "LKR.900/h"],
      sports: ["football", "cricket", "tennis"],
    },
    {
      id: 2,
      name: "Ahmd Sport",
      image:
        "https://caavl.com/storage/files/lk/1928/thumb-816x460-6feaf76aff9cd80dcff6b389660e36ba.jpeg",
      rating: 4.5,
      reviews: 856,
      address: "7009 Forest Avenue, Boston, MA 02119",
      prices: ["LKR.1300/h", "LKR.500/h", "LKR.1900/h"],
      sports: ["football", "gaming"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex md:flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          {/* Left Column - Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">I</span>
            </div>
            <span className="text-lg font-semibold">IndoorB</span>
          </div>

          {/* Right Column - Message and Notification Buttons */}
          <div className="flex items-center gap-2">
            <Link to="/messages">
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/20 hover:bg-white/30 text-white p-2"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </Link>

            <NotificationBadge count={3} />
          </div>
        </div>
      </div>

      <div className="px-4 pb-2">
        {/* Search */}
        <div className="relative -mt-6 mb-6 md:mt-3.5">
            <div className="bg-white rounded-2xl shadow-sm border p-4 md:mt-8 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <Input
                placeholder="Search Complex, Sports etc"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-12 border-gray-200 rounded-xl"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="w-5 h-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.active ? "default" : "secondary"}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                category.active
                  ? "bg-green-100 text-primary border-0"
                  : "bg-gray-100 text-green-700 border-0"
              }`}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Nearby Section */}
        <div className="flex flex-col relative min-h-[100px] p-5 max-w-[1200px] mx-auto mb-5 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Nearby</h2>
            <Link to="/search" className="text-sm text-green-600 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
            {venues.concat(venues).map((venue, index) => (
              <div
                key={`${venue.id}-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border min-w-[220px] max-w-[90vw] flex-shrink-0 snap-start"
              >
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white/90"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{venue.rating}</span>
                    <span className="text-xs text-gray-500">
                      ({venue.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{venue.address}</p>

                  <div className="flex items-center gap-4 mb-4">
                    {venue.prices.map((price, index) => (
                      <span key={index} className="text-xs text-gray-700">
                        {price}
                      </span>
                    ))}
                  </div>

                  <Link to={`/venue/${venue.id}`}>
                    <Button className="w-full bg-green-50 text-primary border-0 hover:bg-green-100">
                      Check Availability
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex flex-col relative min-h-[100px] p-5 max-w-[1400px] w-full mx-auto mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Our Recommendations
            </h2>
            <Link to="/search" className="text-sm text-green-600 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide snap-x snap-mandatory">
            {[
              {
          name: "Thansar Futsal",
          image: venues[0].image,
          rating: 4.5,
          reviews: 1240,
          address: "W5975 Elizabeth Ln, Tomahawk, WI 54487",
          id: 3,
              },
              {
          name: "Royal Cricket Club",
          image:
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
          rating: 4.8,
          reviews: 856,
          address: "7009 Forest Avenue, Boston, MA 02119",
          id: 4,
              },
              {
          name: "Elite Badminton Center",
          image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop",
          rating: 4.6,
          reviews: 592,
          address: "1234 Sports Avenue, Colombo 05",
          id: 5,
              },
            ].map((venue) => (
              <div
          key={venue.id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border min-w-[240px] max-w-[90vw] flex-shrink-0 snap-start"
              >
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{venue.rating}</span>
              <span className="text-xs text-gray-500">
                ({venue.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {venue.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3">{venue.address}</p>
            <Link to={`/venue/${venue.id}`}>
              <Button className="w-full bg-green-50 text-primary border-0 hover:bg-green-100">
                Check Availability
              </Button>
            </Link>
          </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  
      {/* Recent Feed News Section */}
      <div className="flex flex-col relative min-h-[100%] p-5 max-w-[100%] mx-auto">
        <section className="flex flex-col relative min-h-[100px] p-3 w-full self-stretch flex-grow max-w-[1200px] mx-auto">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Sports News
              </h2>
                <Link
                to="/feed"
                className="text-sm text-green-600 font-medium hover:underline"
                >
                View All
                </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide snap-x snap-mandatory">
                {[
                {
                  id: 1,
                  title: "Local Cricket Tournament Starts This Weekend",
                  excerpt:
                  "Inter-district cricket tournament featuring 16 teams from Colombo.",
                  image:
                  "https://www.kreedon.com/_next/image?url=https%3A%2F%2Fwww.kreedon.in%2Fwp-content%2Fuploads%2F2021%2F08%2Franji-trophy-stock-fb.jpg&w=3840&q=75",
                  category: "Cricket",
                  timestamp: "2 hours ago",
                  venue: "Multiple Venues",
                  isLive: false,
                },
                {
                  id: 2,
                  title: "New Badminton Courts Open at SportZone",
                  excerpt:
                  "State-of-the-art facilities with professional lighting now available for booking.",
                  image:
                  "https://www.singaporeexpo.com.sg/adobe/dynamicmedia/deliver/dm-aid--74f92e87-da7f-489f-bb75-0663310f0ad9/badminton-hall-website-banner.jpg?preferwebp=true&quality=85&width=1200",
                  category: "Badminton",
                  timestamp: "4 hours ago",
                  venue: "SportZone Complex",
                  isLive: false,
                },
                {
                  id: 3,
                  title: "Live: Football Championship Final",
                  excerpt:
                  "Thunder FC vs Lightning United - Championship final now streaming live.",
                  image:
                  "https://i.guim.co.uk/img/media/33b91fee52cd09b53d8f83f669de4e280b218cc3/0_177_5670_3404/master/5670.jpg?width=465&dpr=1&s=none&crop=none",
                  category: "Football",
                  timestamp: "Live",
                  venue: "National Stadium",
                  isLive: true,
                },
                {
                  id: 4,
                  title: "Swimming Pool Renovations Complete",
                  excerpt:
                  "Pro Courts aquatic center reopens with upgraded facilities and equipment.",
                  image:
                  "https://galaxyhomerecreation.com/wp-content/uploads/2022/12/galaxy-inground-pool-banner-2.jpg",
                  category: "Swimming",
                  timestamp: "1 day ago",
                  venue: "Pro Courts",
                  isLive: false,
                },
                {
                  id: 5,
                  title: "Tennis Academy Launches Junior Program",
                  excerpt:
                  "New coaching program for young players aged 8-16 with professional trainers.",
                  image:
                  "https://i0.wp.com/indiantennisdaily.com/wp-content/uploads/2024/05/rbta1.jpeg?resize=930%2C450&ssl=1",
                  category: "Tennis",
                  timestamp: "2 days ago",
                  venue: "Elite Tennis Academy",
                  isLive: false,
                },
                ].map((news) => (
                <div
                  key={news.id}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="relative">
                    <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-36 object-cover"
                    />
                    {news.isLive && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    )}
                    <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-black/70 text-white text-xs"
                    >
                      {news.category}
                    </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col h-full">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 break-words">
                    {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 break-words">
                    {news.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <div className="flex items-center gap-1 min-w-0">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate break-words">{news.venue}</span>
                    </div>
                    <span
                      className={
                      news.isLive ? "text-red-500 font-medium" : ""
                      }
                    >
                      {news.timestamp}
                    </span>
                    </div>
                  </div>
                  </div>
                </div>
                ))}
            </div>
          </div>

          {/* Quick Actions */}
            <div className="mt-4 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/feed" className="block">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">📰</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Sports Feed</h4>
                <p className="text-xs opacity-90">
                {/* Latest updates & news */}
                </p>
              </div>
              </div>
              </div>
              </Link>

              <Link to="/booking-history" className="block">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">My Bookings</h4>
                {/* <p className="text-xs opacity-90">View your activity</p> */}
              </div>
              </div>
              </div>
              </Link>
            </div>
            </div>
        </section>
      </div>
        {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4">
        <div className="flex items-center justify-around">
          <Link to="/booking-history" className="text-center text-white">
            <Calendar className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">History</span>
          </Link>
          <Link to="/feed" className="text-center text-white">
            <List className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Feed</span>
          </Link>
          <div className="text-center text-white">
            <Link
              to="/dashboard"
              className="bg-white text-green-600 rounded-full p-3 inline-block"
            >
              <Home className="h-6 w-6" />
            </Link>
          </div>
          <Link to="/search" className="text-center text-white">
            <Search className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Search</span>
          </Link>
          <Link to="/profile" className="text-center text-white">
            <User className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
