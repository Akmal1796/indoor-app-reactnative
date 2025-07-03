import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Trophy,
  Edit3,
  Check,
  X,
  Upload,
  Star,
  Home,
  List,
  Search,
} from "lucide-react";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
    dateOfBirth: "1990-05-15",
    bio: "Passionate sports enthusiast who loves playing badminton and cricket. Always looking for new venues to explore!",
    favoritesSports: ["Badminton", "Cricket", "Swimming"],
    achievements: ["100+ Bookings Completed", "Premium Member", "Top Reviewer"],
  });

  const [tempData, setTempData] = useState(profileData);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const addSport = (sport: string) => {
    if (!tempData.favoritesSports.includes(sport)) {
      setTempData((prev) => ({
        ...prev,
        favoritesSports: [...prev.favoritesSports, sport],
      }));
    }
  };

  const removeSport = (sport: string) => {
    setTempData((prev) => ({
      ...prev,
      favoritesSports: prev.favoritesSports.filter((s) => s !== sport),
    }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Edit Profile
              </h1>
              <p className="text-sm text-gray-500">Update your information</p>
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="px-3"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[#1DBF73] hover:bg-[#17a862] px-3"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="px-3"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20 max-w-md mx-auto">
        {/* Profile Picture Section */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <CardContent className="p-6 text-white">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-1">
                {isEditing ? tempData.name : profileData.name}
              </h2>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <span className="text-sm opacity-90">Premium Member</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={tempData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.name}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={tempData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-700"
                >
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={tempData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{profileData.location}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="dob"
                  className="text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </Label>
                {isEditing ? (
                  <Input
                    id="dob"
                    type="date"
                    value={tempData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-green-500" />
              About Me
            </h3>
            {isEditing ? (
              <textarea
                value={tempData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Favorite Sports */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-orange-500" />
              Favorite Sports
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(isEditing
                ? tempData.favoritesSports
                : profileData.favoritesSports
              ).map((sport) => (
                <Badge
                  key={sport}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
                >
                  {sport}
                  {isEditing && (
                    <button
                      onClick={() => removeSport(sport)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex flex-wrap gap-2">
                {[
                  "Tennis",
                  "Football",
                  "Basketball",
                  "Volleyball",
                  "Table Tennis",
                ]
                  .filter((sport) => !tempData.favoritesSports.includes(sport))
                  .map((sport) => (
                    <Button
                      key={sport}
                      variant="outline"
                      size="sm"
                      onClick={() => addSport(sport)}
                      className="text-xs"
                    >
                      + {sport}
                    </Button>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              Achievements
            </h3>
            <div className="space-y-3">
              {profileData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Privacy & Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    Profile Visibility
                  </p>
                  <p className="text-sm text-gray-500">
                    Control who can see your profile
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Public
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Activity Status</p>
                  <p className="text-sm text-gray-500">
                    Show when you're active
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default ProfileEdit;
