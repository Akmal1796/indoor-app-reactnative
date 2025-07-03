import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, MapPin, Filter, Star } from "lucide-react";

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
        "https://cdn.builder.io/api/v1/image/assets%2F9182c3ca263146469688dd4c08fe07e2%2Facf91b9d57e64a92b0af763ffa7de4af?format=webp&width=800",
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
        "https://cdn.builder.io/api/v1/image/assets%2F9182c3ca263146469688dd4c08fe07e2%2F346236e223bd4bddb7217ef84f427303?format=webp&width=800",
      rating: 4.5,
      reviews: 856,
      address: "7009 Forest Avenue, Boston, MA 02119",
      prices: ["LKR.1300/h", "LKR.500/h", "LKR.1900/h"],
      sports: ["football", "gaming"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Your Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                Alijinna Mawatha Thihariya
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="bg-primary/30 text-white"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Search */}
        <div className="relative -mt-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border p-4">
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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Nearby</h2>
            <Link to="/search" className="text-sm text-green-600 font-medium">
              See all
            </Link>
          </div>

          <div className="space-y-4">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border"
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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Our Recommendations
            </h2>
            <Link to="/search" className="text-sm text-green-600 font-medium">
              See all
            </Link>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border">
            <img
              src={venues[0].image}
              alt="Recommended venue"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.5</span>
                <span className="text-xs text-gray-500">(1,240 reviews)</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Thansar Futsal
              </h3>
              <p className="text-xs text-gray-500">
                W5975 Elizabeth Ln, Tomahawk, WI 54487
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary px-4 py-2">
        <div className="flex items-center justify-center relative">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-around items-center mt-2">
          <div className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
            </svg>
          </div>
          <div className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
