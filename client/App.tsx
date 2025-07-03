import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VenueDetails from "./pages/VenueDetails";
import SportSelection from "./pages/SportSelection";
import BookingForm from "./pages/BookingForm";
import BookingSummary from "./pages/BookingSummary";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Feed from "./pages/Feed";
import BookingHistory from "./pages/BookingHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/sport/:id" element={<SportSelection />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
