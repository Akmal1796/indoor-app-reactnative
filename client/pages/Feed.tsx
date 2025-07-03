import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  MapPin,
  Clock,
  Users,
  Home,
  Calendar,
  List,
  Search,
  User,
} from "lucide-react";

const Feed = () => {
  const feedItems = [
    {
      id: 1,
      type: "venue_update",
      venue: "SportZone Complex",
      title: "New Badminton Court Available!",
      content:
        "We've just opened our brand new premium badminton court with professional lighting and wooden flooring.",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      location: "Colombo 07",
    },
    {
      id: 2,
      type: "promotion",
      venue: "Elite Fitness Arena",
      title: "30% Off Weekend Bookings",
      content:
        "Book any court this weekend and get 30% off! Perfect time to play with friends and family.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
      timestamp: "4 hours ago",
      likes: 45,
      comments: 12,
      location: "Nugegoda",
      discount: "30% OFF",
    },
    {
      id: 3,
      type: "news",
      title: "Local Cricket Tournament This Weekend",
      content:
        "Join the inter-district cricket tournament happening at various venues across Colombo. Registration closes tomorrow!",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
      timestamp: "6 hours ago",
      likes: 78,
      comments: 23,
      location: "Multiple Venues",
    },
    {
      id: 4,
      type: "venue_update",
      venue: "Pro Courts",
      title: "Facility Maintenance Complete",
      content:
        "Our swimming pool and changing rooms have been upgraded with new facilities. Come check out the improvements!",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=200&fit=crop",
      timestamp: "1 day ago",
      likes: 32,
      comments: 5,
      location: "Dehiwala",
    },
    {
      id: 5,
      type: "trending",
      title: "Top 5 Most Booked Sports This Month",
      content:
        "Badminton leads the way followed by cricket and futsal. See what's trending in your area!",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop",
      timestamp: "2 days ago",
      likes: 156,
      comments: 34,
      trending: true,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "venue_update":
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case "promotion":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "news":
        return <Bell className="h-4 w-4 text-orange-500" />;
      case "trending":
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4827EC] text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Sports Feed</h1>
            <p className="text-sm opacity-80">Latest updates and news</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant="default"
            size="sm"
            className="bg-[#1DBF73] hover:bg-[#17a862] whitespace-nowrap"
          >
            All
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Venues
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Promotions
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            News
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Trending
          </Button>
        </div>

        {/* Feed Items */}
        <div className="space-y-4">
          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {item.discount}
                    </div>
                  )}
                  {item.trending && (
                    <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      {item.venue && (
                        <span className="text-sm font-medium text-gray-600">
                          {item.venue}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {item.timestamp}
                    </div>
                  </div>

                  {/* Title and Content */}
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.content}
                  </p>

                  {/* Location */}
                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{item.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{item.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button variant="outline" className="w-full">
            Load More Posts
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#4827EC] text-white p-4">
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
              className="bg-white text-[#4827EC] rounded-full p-3 inline-block"
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
};

export default Feed;
