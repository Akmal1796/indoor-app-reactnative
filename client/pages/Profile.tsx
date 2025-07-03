import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Users,
  CreditCard,
  Ticket,
  Settings,
  Headphones,
  Calendar,
  List,
  Search,
  Home,
  User,
} from "lucide-react";

export default function Profile() {
  const user = {
    name: "Ashley Robinson",
    email: "onlybrianwhite@yahoo.com",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets%2F9182c3ca263146469688dd4c08fe07e2%2Facf91b9d57e64a92b0af763ffa7de4af?format=webp&width=800",
    bio: "Nisi ipsum officia consequat ea in non eiusmod eu. Reprehenderit et exercitation dolore pariatur dolor id aliquip amet nisi laboris.",
  };

  const menuItems = [
    {
      icon: Users,
      title: "Team",
      href: "/team",
      showArrow: true,
    },
    {
      icon: CreditCard,
      title: "Payments",
      href: "/payments",
      showArrow: true,
    },
    {
      icon: Ticket,
      title: "Your Promos",
      href: "/promos",
      showArrow: true,
    },
    {
      icon: Settings,
      title: "Settings",
      href: "/settings",
      showArrow: true,
    },
    {
      icon: Headphones,
      title: "Support",
      href: "/support",
      showArrow: true,
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="pb-20">
        {/* Profile Section */}
        <div className="bg-white">
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover bg-green-100"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900 mb-1">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-500 mb-3">{user.email}</p>
                <Link to="/profile/edit">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bio */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6 space-y-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} to={item.href}>
                <Card className="border-gray-200 hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-50 rounded-full">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {item.title}
                        </span>
                      </div>
                      {item.showArrow && (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
