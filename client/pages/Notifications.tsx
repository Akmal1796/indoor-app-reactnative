import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  X,
  Settings,
  Filter,
  Calendar,
  MapPin,
  Trophy,
  Users,
  MessageCircle,
  CreditCard,
  Star,
  Gift,
  AlertCircle,
  Home,
  List,
  Search,
  User,
} from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "all" | "unread" | "booking" | "social"
  >("all");

  const notifications = [
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message:
        "Your badminton court booking at SportZone Complex has been confirmed for Jan 20, 2024 at 6:00 PM.",
      timestamp: "5 minutes ago",
      isRead: false,
      venue: "SportZone Complex",
      icon: Calendar,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      actionText: "View Booking",
      priority: "high",
    },
    {
      id: 2,
      type: "team_invite",
      title: "Team Invitation",
      message:
        "John Anderson invited you to join Thunder Hawks cricket team. 12 members already joined.",
      timestamp: "2 hours ago",
      isRead: false,
      teamName: "Thunder Hawks",
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      actionText: "View Team",
      priority: "high",
    },
    {
      id: 3,
      type: "payment_success",
      title: "Payment Successful",
      message:
        "Payment of LKR 2,500 for your futsal booking has been processed successfully.",
      timestamp: "4 hours ago",
      isRead: true,
      amount: "LKR 2,500",
      icon: CreditCard,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      actionText: "View Receipt",
      priority: "medium",
    },
    {
      id: 4,
      type: "venue_promotion",
      title: "Special Offer - 30% Off",
      message:
        "Elite Fitness Arena is offering 30% off on weekend bookings. Limited time offer!",
      timestamp: "6 hours ago",
      isRead: true,
      venue: "Elite Fitness Arena",
      discount: "30% OFF",
      icon: Gift,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100",
      actionText: "Book Now",
      priority: "medium",
    },
    {
      id: 5,
      type: "match_reminder",
      title: "Match Reminder",
      message:
        "Your cricket match with Lightning United is scheduled for tomorrow at 9:00 AM.",
      timestamp: "8 hours ago",
      isRead: false,
      opponent: "Lightning United",
      icon: Trophy,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
      actionText: "View Match",
      priority: "high",
    },
    {
      id: 6,
      type: "review_request",
      title: "Review Your Experience",
      message:
        "How was your recent visit to Pro Courts? Share your feedback and help others.",
      timestamp: "1 day ago",
      isRead: true,
      venue: "Pro Courts",
      icon: Star,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
      actionText: "Write Review",
      priority: "low",
    },
    {
      id: 7,
      type: "booking_cancelled",
      title: "Booking Cancelled",
      message:
        "Your swimming session at Aqua Center has been cancelled due to maintenance. Full refund processed.",
      timestamp: "2 days ago",
      isRead: true,
      venue: "Aqua Center",
      refund: "LKR 1,500",
      icon: AlertCircle,
      iconColor: "text-red-500",
      iconBg: "bg-red-100",
      actionText: "Rebook",
      priority: "high",
    },
    {
      id: 8,
      type: "friend_activity",
      title: "Friend Activity",
      message:
        "Sarah completed a badminton match and earned 50 points. You're 20 points behind in the leaderboard!",
      timestamp: "3 days ago",
      isRead: true,
      friend: "Sarah",
      points: 50,
      icon: Trophy,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      actionText: "View Leaderboard",
      priority: "low",
    },
  ];

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "booking":
        return notifications.filter(
          (n) =>
            n.type.includes("booking") ||
            n.type.includes("payment") ||
            n.type.includes("match"),
        );
      case "social":
        return notifications.filter(
          (n) =>
            n.type.includes("team") ||
            n.type.includes("friend") ||
            n.type.includes("review"),
        );
      default:
        return notifications;
    }
  };

  const markAsRead = (id: number) => {
    // Handle mark as read logic
    console.log("Mark as read:", id);
  };

  const markAllAsRead = () => {
    // Handle mark all as read logic
    console.log("Mark all as read");
  };

  const deleteNotification = (id: number) => {
    // Handle delete notification logic
    console.log("Delete notification:", id);
  };

  const getNotificationCounts = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const bookingCount = notifications.filter(
      (n) =>
        n.type.includes("booking") ||
        n.type.includes("payment") ||
        n.type.includes("match"),
    ).length;
    const socialCount = notifications.filter(
      (n) =>
        n.type.includes("team") ||
        n.type.includes("friend") ||
        n.type.includes("review"),
    ).length;

    return { unreadCount, bookingCount, socialCount };
  };

  const { unreadCount, bookingCount, socialCount } = getNotificationCounts();
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="p-2 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Notifications</h1>
              <p className="text-sm opacity-80">
                Stay updated with your sports activities
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="bg-white/20 hover:bg-white/30 text-white text-xs px-3"
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white p-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "unread"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full">
                {unreadCount}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "booking"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Bookings ({bookingCount})
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "social"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Social ({socialCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 pb-20 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600">
              {activeTab === "unread"
                ? "You're all caught up! No unread notifications."
                : `No ${activeTab} notifications at the moment.`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.isRead
                    ? "border-l-4 border-l-[#4827EC] bg-blue-50/30"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className={`p-2 rounded-full ${notification.iconBg} flex-shrink-0`}
                    >
                      <IconComponent
                        className={`h-5 w-5 ${notification.iconColor}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-2">
                          {notification.priority === "high" && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {notification.timestamp}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#4827EC] rounded-full"></div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {notification.message}
                      </p>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {notification.venue && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{notification.venue}</span>
                            </div>
                          )}
                          {notification.discount && (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600 text-xs"
                            >
                              {notification.discount}
                            </Badge>
                          )}
                          {notification.amount && (
                            <span className="font-medium text-green-600">
                              {notification.amount}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-3 h-8"
                          >
                            {notification.actionText}
                          </Button>
                          <div className="flex gap-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 h-8 w-8 hover:bg-gray-100"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
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

export default Notifications;
