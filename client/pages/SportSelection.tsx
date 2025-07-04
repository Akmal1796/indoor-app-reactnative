import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Heart,
  Star,
  MapPin,
  Trophy,
  Droplets,
  Home,
  Calendar,
  List,
  Search,
  User,
} from "lucide-react";

export default function SportSelection() {
  const { id } = useParams();

  const sport = {
    id: 1,
    name: "Football/Soccer",
    price: "1300",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9182c3ca263146469688dd4c08fe07e2%2F0bacbc64bb404aeca69c29763fb711dc?format=webp&width=800",
    venue: {
      name: "Kanzul Sports Complex",
      rating: 4.5,
      reviews: 1240,
      address: "6315 N. Warana Road Thihariya",
      location: "Kalagedihena",
      monthlyRate: "$11,049/month",
    },
    facilities: [
      {
        name: "Square Feet",
        details: ["10x10 Square", "11 player can play for a side"],
        icon: Trophy,
      },
      {
        name: "Scoreboard Display",
        details: ["Digital or manual scoring system"],
        icon: () => (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
          </svg>
        ),
      },
      {
        name: "Changing Rooms & Showers",
        details: [
          "For teams to get ready and clean up after games",
          "Separate male and female washrooms",
        ],
        icon: Droplets,
      },
    ],
    available: true,
    discounts: [
      { type: "20% Off", color: "bg-green-500" },
      { type: "Genuine Discount", color: "bg-blue-500" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
        <p className="text-sm opacity-80">Your Location</p>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">San Francisco, CA</span>
        </div>
          </div>
          <Button
        size="sm"
        variant="ghost"
        className="bg-green-700 text-white"
          >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
          </Button>
        </div>
      </div>

      <div className="pb-20">
        {/* Hero Image with overlay */}
        <div className="relative">
          <img
            src={sport.image}
            alt={sport.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <Link
            to={`/venue/${sport.id}`}
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white/90"
          >
            <Heart className="w-5 h-5" />
          </Button>

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{sport.venue.rating}</span>
              <span className="text-xs text-gray-500">
                ({sport.venue.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {sport.venue.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              {sport.venue.monthlyRate}
            </p>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {sport.venue.address}
            </p>
            <p className="text-sm text-gray-500">{sport.venue.location}</p>
          </div>
        </div>

        {/* Sport Details Card */}
        <div className="bg-white m-4 rounded-3xl p-6 shadow-sm">
          {/* Facilities */}
          <div className="space-y-6 mb-8">
            {sport.facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {facility.name}
                    </h3>
                    {facility.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-sm text-gray-500 mb-1"
                      >
                        -{detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Section */}
          <div className="border-t pt-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Per Hour</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-gray-900">
                  LKR {sport.price}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.4</span>
                </div>
                {sport.discounts.map((discount, index) => (
                  <Badge
                    key={index}
                    className={`${discount.color} text-white text-xs px-2 py-1`}
                  >
                    {discount.type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Book Button */}
            {sport.available ? (
              <Link to="/booking" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-medium">
                  Book Now
                </Button>
              </Link>
            ) : (
              <Button
                disabled
                className="w-full bg-gray-200 text-gray-500 py-4 rounded-xl text-lg font-medium"
              >
                Not Available
              </Button>
            )}
          </div>
        </div>
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
