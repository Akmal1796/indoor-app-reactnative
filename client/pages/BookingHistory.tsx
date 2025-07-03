import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Filter,
  Search,
  ChevronRight,
  Users,
  Home,
  List,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const bookings = [
    {
      id: "BK001",
      venue: "SportZone Complex",
      sport: "Badminton",
      court: "Court A",
      date: "2024-01-15",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hour",
      price: 2500,
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop",
      location: "Colombo 07",
      players: 4,
      qrCode: true,
    },
    {
      id: "BK002",
      venue: "Elite Fitness Arena",
      sport: "Cricket",
      court: "Pitch 1",
      date: "2024-01-12",
      time: "2:00 PM - 4:00 PM",
      duration: "2 hours",
      price: 5000,
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop",
      location: "Nugegoda",
      players: 22,
      qrCode: false,
      rating: 5,
    },
    {
      id: "BK003",
      venue: "Pro Courts",
      sport: "Swimming",
      court: "Pool Lane 3-4",
      date: "2024-01-10",
      time: "6:00 AM - 7:00 AM",
      duration: "1 hour",
      price: 1500,
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop",
      location: "Dehiwala",
      players: 2,
      qrCode: false,
      rating: 4,
    },
    {
      id: "BK004",
      venue: "Champions Arena",
      sport: "Futsal",
      court: "Field 2",
      date: "2024-01-08",
      time: "8:00 PM - 9:00 PM",
      duration: "1 hour",
      price: 4000,
      status: "cancelled",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      location: "Kandy",
      players: 10,
      qrCode: false,
      refund: 4000,
    },
    {
      id: "BK005",
      venue: "Aqua Sports Center",
      sport: "Table Tennis",
      court: "Table 1",
      date: "2024-01-18",
      time: "4:00 PM - 5:00 PM",
      duration: "1 hour",
      price: 1200,
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      location: "Mount Lavinia",
      players: 2,
      qrCode: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Upcoming
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4827EC] text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Booking History</h1>
            <p className="text-sm opacity-80">Your sports activity timeline</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            size="sm"
            className={
              activeTab === "all" ? "bg-[#1DBF73] hover:bg-[#17a862]" : ""
            }
            onClick={() => setActiveTab("all")}
          >
            All ({bookings.length})
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            size="sm"
            className={
              activeTab === "upcoming" ? "bg-[#1DBF73] hover:bg-[#17a862]" : ""
            }
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming ({bookings.filter((b) => b.status === "upcoming").length})
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            size="sm"
            className={
              activeTab === "completed" ? "bg-[#1DBF73] hover:bg-[#17a862]" : ""
            }
            onClick={() => setActiveTab("completed")}
          >
            Completed ({bookings.filter((b) => b.status === "completed").length}
            )
          </Button>
          <Button
            variant={activeTab === "cancelled" ? "default" : "outline"}
            size="sm"
            className={
              activeTab === "cancelled" ? "bg-[#1DBF73] hover:bg-[#17a862]" : ""
            }
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled ({bookings.filter((b) => b.status === "cancelled").length}
            )
          </Button>
        </div>

        {/* Booking List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={booking.image}
                      alt={booking.venue}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-1 -right-1">
                      {getStatusIcon(booking.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 truncate">
                          {booking.venue}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {booking.sport} • {booking.court}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    {/* Details */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(booking.date)}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{booking.location}</span>
                        <Users className="h-3 w-3 ml-2" />
                        <span>{booking.players} players</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold text-gray-800">
                          LKR {booking.price.toLocaleString()}
                        </span>
                        {booking.refund && (
                          <p className="text-xs text-green-600">
                            Refunded: LKR {booking.refund.toLocaleString()}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {booking.qrCode && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2"
                          >
                            <QrCode className="h-3 w-3 mr-1" />
                            QR
                          </Button>
                        )}
                        {booking.status === "completed" && booking.rating && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2"
                          >
                            ⭐ {booking.rating}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs px-2"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Booking ID: {booking.id}</span>
                    {(booking.status === "completed" || booking.qrCode) && (
                      <button className="flex items-center gap-1 hover:text-gray-700">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === "all"
                ? "You haven't made any bookings yet"
                : `No ${activeTab} bookings found`}
            </p>
            <Link to="/dashboard">
              <Button className="bg-[#1DBF73] hover:bg-[#17a862]">
                Explore Venues
              </Button>
            </Link>
          </div>
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

export default BookingHistory;
