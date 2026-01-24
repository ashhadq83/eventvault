"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CalendarSectionProps {
  onBookNow: () => void;
}

export default function CalendarSection({ onBookNow }: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const bookedDates = [
    new Date(2026, 0, 15),
    new Date(2026, 0, 21),
    new Date(2026, 0, 28),
    new Date(2026, 1, 5),
    new Date(2026, 1, 14),
    new Date(2026, 1, 22),
  ];

  const getDateStatus = (date: Date) => {
    const isBooked = bookedDates.some(
      (d) => d.toDateString() === date.toDateString(),
    );
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return { isBooked, isWeekend };
  };

  return (
    <div className="mt-20 w-full max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-indigo-900 mb-3">
          Check Venue Availability
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See real-time hall bookings and open dates. Full calendar & conflict
          detection coming soon.
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
            <DateStatus
              date={selectedDate}
              status={getDateStatus(selectedDate)}
              onBookNow={onBookNow}
            />
          )}
        </CardContent>
      </Card>

      <p className="text-center text-sm text-gray-500 mt-6">
        Click any date to see availability details (demo mode)
      </p>
    </div>
  );
}

interface DateStatusProps {
  date: Date;
  status: { isBooked: boolean; isWeekend: boolean };
  onBookNow: () => void;
}

function DateStatus({ date, status, onBookNow }: DateStatusProps) {
  const { isBooked, isWeekend } = status;

  if (isBooked) {
    return (
      <div className="text-center mt-6 space-y-4">
        <p className="text-lg font-medium text-indigo-900">
          {date.toLocaleDateString("en-CA", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-base font-semibold text-red-600">
          Fully Booked – No slots available this day
        </p>
      </div>
    );
  }

  if (isWeekend) {
    return (
      <div className="text-center mt-6 space-y-4">
        <p className="text-lg font-medium text-indigo-900">
          {date.toLocaleDateString("en-CA", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-base font-semibold text-yellow-600">
          Limited Availability – Weekend premium
        </p>
        <p className="text-sm text-gray-600">Starting from $1,800 (full day)</p>
        <Button
          variant="outline"
          className="mt-4 border-yellow-600 text-yellow-700 hover:bg-yellow-50"
        >
          Contact Us for Waitlist
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center mt-6 space-y-4">
      <p className="text-lg font-medium text-indigo-900">
        {date.toLocaleDateString("en-CA", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="text-base font-semibold text-green-600">
        Available – Ready to book
      </p>
      <p className="text-sm text-gray-600">
        From $1,200 (full day) or $150/hour
      </p>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold shadow-md"
        onClick={onBookNow}
      >
        Book Now
      </Button>
    </div>
  );
}
