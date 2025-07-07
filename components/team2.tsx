import React, { useState } from "react";
import { Button } from "@/components/ui/button";
//import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Users,
  Crown,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Star,
  Edit3,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Settings,
  Share2,
  Camera,
  Home,
  List,
  User,
} from "lucide-react";

const Team = () => {
  //const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"my-teams" | "create" | "join">(
    "my-teams",
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    sport: "",
    description: "",
    privacy: "public",
    maxMembers: 15,
  });

  const myTeams = [
    {
      id: 1,
      name: "Thunder Hawks",
      sport: "Cricket",
      members: 12,
      maxMembers: 15,
      role: "Captain",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&h=120&fit=crop",
      upcomingMatch: "Jan 20, 2024",
      wins: 8,
      losses: 2,
      isActive: true,
      description:
        "Competitive cricket team focused on tournaments and local leagues.",
    },
    {
      id: 2,
      name: "Badminton Aces",
      sport: "Badminton",
      members: 8,
      maxMembers: 10,
      role: "Member",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=120&h=120&fit=crop",
      upcomingMatch: "Jan 18, 2024",
      wins: 15,
      losses: 3,
      isActive: true,
      description: "Recreational badminton group playing twice a week.",
    },
    {
      id: 3,
      name: "Futsal United",
      sport: "Futsal",
      members: 10,
      maxMembers: 12,
      role: "Vice Captain",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop",
      upcomingMatch: null,
      wins: 5,
      losses: 4,
      isActive: false,
      description: "Weekend futsal team for casual matches and tournaments.",
    },
  ];

  const availableTeams = [
    {
      id: 4,
      name: "Elite Swimmers",
      sport: "Swimming",
      members: 6,
      maxMembers: 12,
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=120&h=120&fit=crop",
      location: "Colombo Aquatic Center",
      requirements: "Intermediate level required",
      description: "Looking for dedicated swimmers for competitive training.",
    },
    {
      id: 5,
      name: "Tennis Champions",
      sport: "Tennis",
      members: 4,
      maxMembers: 8,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=120&h=120&fit=crop",
      location: "Royal Tennis Club",
      requirements: "Advanced players only",
      description:
        "Professional tennis team participating in district championships.",
    },
  ];

  const sports = [
    "Cricket",
    "Badminton",
    "Tennis",
    "Football",
    "Futsal",
    "Basketball",
    "Volleyball",
    "Swimming",
    "Table Tennis",
    "Squash",
  ];

  const handleCreateTeam = () => {
    // Handle team creation logic here
    console.log("Creating team:", newTeam);
    setShowCreateForm(false);
    setNewTeam({
      name: "",
      sport: "",
      description: "",
      privacy: "public",
      maxMembers: 15,
    });
  };

  const getRoleIcon = (role: string) => {
    if (role === "Captain")
      return <Crown className="h-4 w-4 text-yellow-500" />;
    if (role === "Vice Captain")
      return <Star className="h-4 w-4 text-blue-500" />;
    return <Users className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-600">
        Inactive
      </Badge>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4827EC] text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              //onClick={() => navigate("/profile")}
              className="p-2 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">My Teams</h1>
              <p className="text-sm opacity-80">Manage your sports teams</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab("my-teams")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "my-teams"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            My Teams ({myTeams.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "create"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Create Team
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "join"
                ? "border-[#4827EC] text-[#4827EC]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Join Team
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* My Teams Tab */}
        {activeTab === "my-teams" && (
          <div className="space-y-4">
            {myTeams.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No teams yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first team or join an existing one
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="bg-[#4827EC] hover:bg-[#3d1fb8]"
                  >
                    Create Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("join")}
                  >
                    Join Team
                  </Button>
                </div>
              </div>
            ) : (
              myTeams.map((team) => (
                <Card key={team.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(team.isActive)}
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-black/20 hover:bg-black/40 text-white p-2"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {team.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm opacity-90">
                                {getRoleIcon(team.role)}
                                <span>{team.role}</span>
                                <span>•</span>
                                <span>{team.sport}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm opacity-90">
                                {team.members}/{team.maxMembers}
                              </div>
                              <div className="text-xs opacity-75">members</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4">
                        {team.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {team.wins}
                          </div>
                          <div className="text-xs text-gray-500">Wins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-red-500">
                            {team.losses}
                          </div>
                          <div className="text-xs text-gray-500">Losses</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">
                            {team.wins + team.losses}
                          </div>
                          <div className="text-xs text-gray-500">Total</div>
                        </div>
                      </div>

                      {team.upcomingMatch && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 text-blue-800">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Next Match: {team.upcomingMatch}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          View Members
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Create Team Tab */}
        {activeTab === "create" && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-[#4827EC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Create New Team
                  </h2>
                  <p className="text-gray-600">
                    Build your sports team and invite players to join
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="team-name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Team Name *
                    </Label>
                    <Input
                      id="team-name"
                      value={newTeam.name}
                      onChange={(e) =>
                        setNewTeam((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your team name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="sport"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sport *
                    </Label>
                    <select
                      id="sport"
                      value={newTeam.sport}
                      onChange={(e) =>
                        setNewTeam((prev) => ({
                          ...prev,
                          sport: e.target.value,
                        }))
                      }
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4827EC] focus:border-transparent"
                    >
                      <option value="">Select a sport</option>
                      {sports.map((sport) => (
                        <option key={sport} value={sport}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Description
                    </Label>
                    <textarea
                      id="description"
                      value={newTeam.description}
                      onChange={(e) =>
                        setNewTeam((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Tell others about your team, playing style, and goals..."
                      rows={3}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4827EC] focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="max-members"
                      className="text-sm font-medium text-gray-700"
                    >
                      Maximum Members
                    </Label>
                    <Input
                      id="max-members"
                      type="number"
                      value={newTeam.maxMembers}
                      onChange={(e) =>
                        setNewTeam((prev) => ({
                          ...prev,
                          maxMembers: parseInt(e.target.value) || 15,
                        }))
                      }
                      min="5"
                      max="50"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Privacy
                    </Label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="privacy"
                          value="public"
                          checked={newTeam.privacy === "public"}
                          onChange={(e) =>
                            setNewTeam((prev) => ({
                              ...prev,
                              privacy: e.target.value,
                            }))
                          }
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          Public - Anyone can find and join
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="privacy"
                          value="private"
                          checked={newTeam.privacy === "private"}
                          onChange={(e) =>
                            setNewTeam((prev) => ({
                              ...prev,
                              privacy: e.target.value,
                            }))
                          }
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          Private - Invitation only
                        </span>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateTeam}
                    disabled={!newTeam.name || !newTeam.sport}
                    className="w-full bg-[#4827EC] hover:bg-[#3d1fb8] disabled:opacity-50"
                  >
                    Create Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Join Team Tab */}
        {activeTab === "join" && (
          <div className="space-y-4">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search teams by name, sport, or location..."
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Available Teams */}
            <div className="space-y-4">
              {availableTeams.map((team) => (
                <Card key={team.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {team.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                {team.sport}
                              </Badge>
                              <span>•</span>
                              <span>
                                {team.members}/{team.maxMembers} members
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#1DBF73] hover:bg-[#17a862]"
                          >
                            <UserPlus className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {team.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{team.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            <span>{team.requirements}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {availableTeams.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No teams found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or create your own team
                </p>
              </div>
            )}
          </div>
        )}
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

export default Team;