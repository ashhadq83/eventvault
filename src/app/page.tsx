"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CalendarSection from "@/components/CalendarSection";
import BookingDialog from "@/components/BookingDialog";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        <HeroSection />
        <FeatureCards />

        <CalendarSection onBookNow={() => setIsBookingOpen(true)} />

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg"
          >
            Explore Venues
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-600 text-indigo-700 px-10 py-6 text-lg"
          >
            Admin Dashboard
          </Button>
        </div>

        <p className="mt-16 text-gray-500 text-sm">
          Built by Ashhad • Calgary, Alberta • 2026
        </p>
      </div>

      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </div>
  );
}
