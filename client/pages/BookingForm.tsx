import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  List,
  Search,
  User,
  Home,
  CalendarArrowDown,
} from "lucide-react";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>("football");

  const games = [
    { id: "football", name: "Football/Soccer", price: "LKR 1300" },
    { id: "tennis", name: "Tennis", price: "LKR 800" },
    { id: "pool", name: "Pool/Billiards", price: "LKR 300" },
    { id: "tabletennis", name: "Table Tennis", price: "LKR 500" },
  ];

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTimeSlots.length > 0 && selectedGame) {
      const gameObj = games.find((g) => g.id === selectedGame);
      const price = parseInt(gameObj?.price.replace(/[^\d]/g, "") || "0", 10);
      const total = price * selectedTimeSlots.length;
      const bookingData = {
        game: gameObj,
        date: selectedDate,
        time: selectedTimeSlots, // pass as array
        venue: "Kanzul Sports Complex",
        total, // pass total amount
      };
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }
  };

  function mergeTimeSlots(slots: string[]) {
    if (slots.length === 0) return [];
    // Parse slots into [start, end] pairs
    const ranges = slots
      .map((slot) => {
        const [start, end] = slot.split(" - ");
        // Convert to 24h for sorting
        const to24 = (t: string) => {
          const [time, ampm] = t.split(" ");
          let [h, m] = time.split(":").map(Number);
          if (ampm === "PM" && h !== 12) h += 12;
          if (ampm === "AM" && h === 12) h = 0;
          return h * 60 + m;
        };
        return { start, end, startMins: to24(start), endMins: to24(end) };
      })
      .sort((a, b) => a.startMins - b.startMins);

    const merged: { start: string; end: string }[] = [];
    let curr = { ...ranges[0] };

    for (let i = 1; i < ranges.length; i++) {
      if (curr.endMins === ranges[i].startMins) {
        // Extend current range
        curr.end = ranges[i].end;
        curr.endMins = ranges[i].endMins;
      } else {
        merged.push({ start: curr.start, end: curr.end });
        curr = { ...ranges[i] };
      }
    }
    merged.push({ start: curr.start, end: curr.end });
    return merged.map((r) => `${r.start} - ${r.end}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
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
        className="bg-green-700 text-white"
          >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Back Button */}
        <Link
          to="/sport/1"
          className="inline-flex items-center gap-2 mb-6 text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Sport Details</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Book Your Slot
        </h1>

        <div className="space-y-6">
          {/* Game Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Select Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a game" />
                </SelectTrigger>
                <SelectContent>
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{game.name}</span>
                        <span className="text-sm text-gray-500 ml-4">
                          {game.price}.00
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Select Time Slot(s)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: 24 }, (_, i) => {
                  const start = new Date();
                  start.setHours(i, 0, 0, 0);
                  const end = new Date();
                  end.setHours(i + 1, 0, 0, 0);
                  const label = `${start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })} - ${end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`;
                  const value = label;
                  const isSelected = selectedTimeSlots.includes(value);

                  // Example: disable "01:00 AM - 02:00 AM"
                  const bookedSlots = ["01:00 AM - 02:00 AM", "03:00 AM - 04:00 AM","04:00 AM - 05:00 AM"];
                  const isBooked = bookedSlots.includes(value);

                  return (
                    <Button
                      key={value}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTimeSlots((prev) =>
                          isSelected
                            ? prev.filter((t) => t !== value)
                            : [...prev, value]
                        );
                        setSelectedTime(value);
                      }}
                      className={
                        isSelected
                          ? "bg-primary text-white"
                          : "hover:bg-primary/10"
                      }
                      disabled={isBooked}
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          {selectedGame && selectedDate && selectedTimeSlots.length > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Venue:</span>
                  <span className="text-sm font-medium">
                    Kanzul Sports Complex
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Game:</span>
                  <span className="text-sm font-medium">
                    {games.find((g) => g.id === selectedGame)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="text-sm font-medium">
                    {selectedDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time:</span>
                  <span className="text-sm font-medium">
                    {mergeTimeSlots(selectedTimeSlots).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">
                    {(() => {
                      const priceStr = games.find((g) => g.id === selectedGame)?.price || "LKR 0";
                      const price = parseInt(priceStr.replace(/[^\d]/g, ""), 10);
                      return `LKR ${price * selectedTimeSlots.length}.00`;
                    })()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Book Button */}
          <Link
            to="/booking-summary"
            onClick={handleBooking}
            className={`block ${
              !(selectedGame && selectedDate && selectedTimeSlots.length > 0)
                ? "pointer-events-none"
                : ""
            }`}
          >
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-medium mb-6"
              disabled={!(selectedGame && selectedDate && selectedTimeSlots.length > 0)}
            >
              Proceed to Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4">
        <div className="flex items-center justify-around">
          <Link to="/booking-history" className="text-center text-white">
            <CalendarArrowDown className="h-6 w-6 mx-auto mb-1" />
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
