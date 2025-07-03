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
      author: "SportZone Admin",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      title: "New Badminton Court Available!",
      content:
        "We've just opened our brand new premium badminton court with professional lighting and wooden flooring. Come check it out! 🏸",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop",
      timestamp: "2 hours ago",
      likes: 124,
      comments: 18,
      shares: 5,
      location: "Colombo 07",
      isLiked: false,
    },
    {
      id: 2,
      type: "promotion",
      venue: "Elite Fitness Arena",
      author: "Elite Arena Marketing",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      title: "30% Off Weekend Bookings",
      content:
        "Book any court this weekend and get 30% off! Perfect time to play with friends and family. Limited slots available! 🏃‍♂️⚽",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
      timestamp: "4 hours ago",
      likes: 245,
      comments: 32,
      shares: 12,
      location: "Nugegoda",
      discount: "30% OFF",
      isLiked: true,
    },
    {
      id: 3,
      type: "news",
      author: "Cricket Sri Lanka",
      authorAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      title: "Local Cricket Tournament This Weekend",
      content:
        "Join the inter-district cricket tournament happening at various venues across Colombo. Registration closes tomorrow! 🏏 Don't miss out on this exciting opportunity to showcase your skills!",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
      timestamp: "6 hours ago",
      likes: 378,
      comments: 67,
      shares: 23,
      location: "Multiple Venues",
      isLiked: false,
    },
    {
      id: 4,
      type: "venue_update",
      venue: "Pro Courts",
      author: "Pro Courts Management",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b78b2a65?w=40&h=40&fit=crop&crop=face",
      title: "Facility Maintenance Complete",
      content:
        "Our swimming pool and changing rooms have been upgraded with new facilities. Come check out the improvements! New lockers, fresh paint, and modern equipment installed. 🏊‍♀️✨",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=200&fit=crop",
      timestamp: "1 day ago",
      likes: 132,
      comments: 15,
      shares: 8,
      location: "Dehiwala",
      isLiked: false,
    },
    {
      id: 5,
      type: "trending",
      author: "Sports Analytics Hub",
      authorAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      title: "Top 5 Most Booked Sports This Month",
      content:
        "Badminton leads the way followed by cricket and futsal. See what's trending in your area! 📊 Interesting stats showing the growing popularity of indoor sports.",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop",
      timestamp: "2 days ago",
      likes: 456,
      comments: 89,
      shares: 34,
      trending: true,
      isLiked: true,
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
      <div className="bg-[#1DBF73] text-white p-4">
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
        {/* Stories Section */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {/* Add Your Story */}
            <div className="min-w-[80px] flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-28 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                  <div className="w-full h-20 bg-gray-400 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-[#1DBF73] rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-1 text-gray-600">
                  Add Story
                </p>
              </div>
            </div>

            {/* Stories */}
            {[
              {
                id: 1,
                user: "SportZone",
                image:
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&h=120&fit=crop",
                isLive: true,
                sport: "Badminton Live",
              },
              {
                id: 2,
                user: "Cricket Club",
                image:
                  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=80&h=120&fit=crop",
                isLive: false,
                sport: "Match Highlights",
              },
              {
                id: 3,
                user: "Elite Arena",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=120&fit=crop",
                isLive: true,
                sport: "Football Live",
              },
              {
                id: 4,
                user: "Pro Courts",
                image:
                  "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=80&h=120&fit=crop",
                isLive: false,
                sport: "Swimming Tips",
              },
            ].map((story) => (
              <div key={story.id} className="min-w-[80px] flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-28 rounded-2xl overflow-hidden ring-2 ring-[#1DBF73] ring-offset-2">
                    <img
                      src={story.image}
                      alt={story.user}
                      className="w-full h-full object-cover"
                    />
                    {story.isLive && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        LIVE
                      </div>
                    )}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#1DBF73] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {story.user[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600 truncate">
                    {story.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Section */}
        <Card className="mb-6 border-gray-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#1DBF73] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <button className="w-full text-left p-3 bg-gray-100 rounded-3xl text-gray-500 hover:bg-gray-200 transition-colors">
                  What's on your mind about sports?
                </button>
              </div>
            </div>
            <div className="flex items-center justify-around pt-3 mt-3 border-t border-gray-100">
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-sm">📹</span>
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  Live Video
                </span>
              </button>
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-sm">📷</span>
                </div>
                <span className="text-gray-600 font-medium text-sm">Photo</span>
              </button>
              <button className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-orange-500" />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  Check-in
                </span>
              </button>
            </div>
          </CardContent>
        </Card>

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
                  {/* Author Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.authorAvatar ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        }
                        alt={item.author || item.venue}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {item.author || item.venue}
                          </span>
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{item.timestamp}</span>
                          {item.location && (
                            <>
                              <span>•</span>
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="text-xl">⋯</span>
                    </button>
                  </div>

                  {/* Title and Content */}
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {/* Engagement Stats */}
                {(item.likes > 0 || item.comments > 0 || item.shares > 0) && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-4">
                        {item.likes > 0 && (
                          <div className="flex items-center gap-1">
                            <div className="flex -space-x-1">
                              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                                ❤️
                              </div>
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                👍
                              </div>
                            </div>
                            <span>{item.likes.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {item.comments > 0 && (
                          <span>{item.comments} comments</span>
                        )}
                        {item.shares > 0 && <span>{item.shares} shares</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-around py-2">
                    <button
                      className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        item.isLiked
                          ? "text-red-500 bg-red-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${item.isLiked ? "fill-red-500" : ""}`}
                      />
                      <span className="font-medium text-sm">Like</span>
                    </button>
                    <button className="flex items-center gap-2 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium text-sm">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="font-medium text-sm">Share</span>
                    </button>
                  </div>

                  {/* Comment Section Preview */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-[#1DBF73] rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl px-3 py-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="bg-transparent text-sm w-full outline-none placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </div>
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
};

export default Feed;
