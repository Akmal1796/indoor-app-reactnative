import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  MoreHorizontal,
  Send,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  MessageCircle,
  Users,
  Clock,
  CheckCheck,
  Home,
  Calendar,
  List,
  User,
  MapPin,
} from "lucide-react";

const Messages = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Thunder Hawks Team",
      lastMessage: "Great match yesterday! When's our next practice?",
      timestamp: "2 min ago",
      unread: 3,
      avatar:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=40&h=40&fit=crop&crop=face",
      isOnline: true,
      type: "team",
    },
    {
      id: 2,
      name: "SportZone Complex",
      lastMessage: "Your booking for tomorrow has been confirmed!",
      timestamp: "1 hour ago",
      unread: 1,
      avatar:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=40&h=40&fit=crop",
      isOnline: false,
      type: "venue",
    },
    {
      id: 3,
      name: "John Anderson",
      lastMessage: "Are you free for badminton this evening?",
      timestamp: "3 hours ago",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      isOnline: true,
      type: "player",
    },
    {
      id: 4,
      name: "Elite Fitness Arena",
      lastMessage: "30% discount available for weekend bookings!",
      timestamp: "1 day ago",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=40&h=40&fit=crop",
      isOnline: false,
      type: "venue",
    },
    {
      id: 5,
      name: "Badminton Aces",
      lastMessage: "Sarah: See you all at 6 PM sharp!",
      timestamp: "2 days ago",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=40&h=40&fit=crop",
      isOnline: false,
      type: "team",
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "John Anderson",
      message: "Hey! Are you free for badminton this evening?",
      timestamp: "3:45 PM",
      isMe: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: 2,
      sender: "Me",
      message: "Yes! What time are you thinking?",
      timestamp: "3:47 PM",
      isMe: true,
      status: "read",
    },
    {
      id: 3,
      sender: "John Anderson",
      message:
        "How about 6 PM at SportZone? I already checked, Court A is available.",
      timestamp: "3:48 PM",
      isMe: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: 4,
      sender: "Me",
      message: "Perfect! Should I book it or do you want to?",
      timestamp: "3:50 PM",
      isMe: true,
      status: "read",
    },
    {
      id: 5,
      sender: "John Anderson",
      message: "I'll book it now. See you there! 🏸",
      timestamp: "3:52 PM",
      isMe: false,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "team":
        return <Users className="h-3 w-3 text-blue-500" />;
      case "venue":
        return <MapPin className="h-3 w-3 text-green-500" />;
      case "player":
        return <User className="h-3 w-3 text-purple-500" />;
      default:
        return <MessageCircle className="h-3 w-3 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#4827EC] text-white p-4 sticky top-0 z-10">
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
              <h1 className="text-xl font-semibold">
                {activeChat
                  ? conversations.find((c) => c.id === activeChat)?.name
                  : "Messages"}
              </h1>
              {activeChat && (
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online</span>
                </div>
              )}
              {!activeChat && (
                <p className="text-sm opacity-80">
                  Stay connected with your sports community
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {activeChat ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white p-2"
                >
                  <Phone className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white p-2"
                >
                  <Video className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white p-2"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white p-2"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white p-2"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {!activeChat ? (
          // Conversations List
          <div className="p-4 pb-20">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Teams
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Venues
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Players
              </Button>
            </div>

            {/* Conversations */}
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setActiveChat(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {conversation.name}
                            </h3>
                            {getTypeIcon(conversation.type)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-[#4827EC] text-white min-w-[20px] h-5 text-xs flex items-center justify-center rounded-full">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.isMe ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!message.isMe && (
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover mt-auto"
                      />
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isMe
                          ? "bg-[#4827EC] text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md border"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          message.isMe ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        <span>{message.timestamp}</span>
                        {message.isMe && message.status === "read" && (
                          <CheckCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#4827EC] hover:bg-[#3d1fb8] p-2"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back Button for Chat */}
      {activeChat && (
        <div className="fixed bottom-20 left-4 z-10">
          <Button
            onClick={() => setActiveChat(null)}
            className="bg-white text-[#4827EC] border border-[#4827EC] hover:bg-gray-50 rounded-full p-3 shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}

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

export default Messages;
