"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const bookedDates = [
    new Date(2026, 0, 15), // Jan 15, 2026 (January is month 0 in JS)
    new Date(2026, 0, 21),
    new Date(2026, 0, 28),
    new Date(2026, 1, 5), // Feb 5
    new Date(2026, 1, 14),
    new Date(2026, 1, 22),
  ];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-950 mb-6 tracking-tight">
          EventVault
        </h1>

        <p className="text-2xl md:text-3xl text-gray-700 mb-10">
          The Smart Way to Book Banquet Halls & Events
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">
                Fast Availability
              </CardTitle>
              <CardDescription>
                Real-time calendar, no conflicts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Check rooms instantly</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">Easy Invoicing</CardTitle>
              <CardDescription>Deposits via Stripe</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Auto-generated contracts</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-800">Mobile Ready</CardTitle>
              <CardDescription>Staff & admin on the go</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">React Native coming soon</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-20 w-full max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-indigo-900 mb-3">
              Check Venue Availability
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See real-time hall bookings and open dates. Full calendar &
              conflict detection coming soon.
            </p>
          </div>

          <Card className="border-indigo-200 shadow-xl overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto w-full max-w-87.5 md:max-w-105"
                classNames={{
                  day_selected: "bg-indigo-600 text-white hover:bg-indigo-600",
                  day_today: "bg-indigo-100 text-indigo-900 font-bold",
                  head_cell: "text-gray-500 font-medium",
                  caption_label: "text-indigo-900 font-semibold",
                }}
              />
              {selectedDate && (
                <div className="text-center mt-6 space-y-4">
                  <p className="text-lg font-medium text-indigo-900">
                    {selectedDate.toLocaleDateString("en-CA", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {(() => {
                    const isBooked = bookedDates.some(
                      (d) => d.toDateString() === selectedDate.toDateString(),
                    );

                    const isWeekend =
                      selectedDate.getDay() === 0 ||
                      selectedDate.getDay() === 6;

                    if (isBooked) {
                      return (
                        <p className="text-base font-semibold text-red-600">
                          Fully Booked – No slots available this day
                        </p>
                      );
                    }

                    if (isWeekend) {
                      return (
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-yellow-600">
                            Limited Availability – Weekend premium
                          </p>
                          <p className="text-sm text-gray-600">
                            Starting from $1,800 (full day)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4 border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                          >
                            Contact Us for Waitlist
                          </Button>
                        </div>
                      );
                    }

                    // Available case – Book Now button
                    return (
                      <div className="space-y-4">
                        <p className="text-base font-semibold text-green-600">
                          Available – Ready to book
                        </p>
                        <p className="text-sm text-gray-600">
                          From $1,200 (full day) or $150/hour
                        </p>
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold shadow-md"
                          onClick={() => setIsBookingOpen(true)}
                        >
                          Book Now
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            Click any date to see availability details (demo mode)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>
              Book{" "}
              {selectedDate?.toLocaleDateString("en-CA", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }) || "a date"}
            </DialogTitle>
            <DialogDescription>
              Tell us about your event – we&apos;ll get back to you soon.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-8 text-center space-y-4">
              <p className="text-2xl font-bold text-green-600">Inquiry Sent!</p>
              <p className="text-gray-600">
                Thank you! We&apos;ll contact you soon about{" "}
                {selectedDate?.toLocaleDateString("en-CA")}.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsBookingOpen(false);
                  setSubmitSuccess(false);
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="col-span-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="guests" className="text-right">
                    Guests
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="100"
                    className="col-span-3"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Event Type
                  </Label>
                  <Textarea
                    id="type"
                    placeholder="Wedding, corporate, birthday..."
                    className="col-span-3"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setSubmitSuccess(true);
                  }}
                >
                  Submit Inquiry
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
