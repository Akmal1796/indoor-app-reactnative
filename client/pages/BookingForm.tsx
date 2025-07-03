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
} from "lucide-react";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
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
    if (selectedDate && selectedTime && selectedGame) {
      // Store booking data and navigate to summary
      const bookingData = {
        game: games.find((g) => g.id === selectedGame),
        date: selectedDate,
        time: selectedTime,
        venue: "Kanzul Sports Complex",
      };
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }
  };

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
                          {game.price}/hour
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
                Select Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={
                      selectedTime === time
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10"
                    }
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          {selectedGame && selectedDate && selectedTime && (
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
                  <span className="text-sm font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">
                    {games.find((g) => g.id === selectedGame)?.price}/hour
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
              !(selectedGame && selectedDate && selectedTime)
                ? "pointer-events-none"
                : ""
            }`}
          >
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-medium"
              disabled={!(selectedGame && selectedDate && selectedTime)}
            >
              Proceed to Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary px-4 py-2">
        <div className="flex items-center justify-center relative">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Link to="/dashboard">
              <svg
                className="w-6 h-6 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex justify-around items-center mt-2">
          <Link to="/booking-history" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
          </Link>
          <Link to="/feed" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5S5 9.329 5 8.5zM9 9h2v1H9V9zm0-2.5h9v1H9v-1zM9 12h9v1H9v-1zm0 2.5h9v1H9v-1zM5 13.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S5 14.328 5 13.5zM5 18.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S5 19.328 5 18.5z" />
            </svg>
          </Link>
          <div className="text-center text-white">
            {/* Center space for home button */}
          </div>
          <Link to="/search" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </Link>
          <Link to="/profile" className="text-center text-white">
            <svg
              className="w-5 h-5 mx-auto mb-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
