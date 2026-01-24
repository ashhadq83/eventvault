"use client";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
}

export default function BookingDialog({
  open,
  onOpenChange,
  selectedDate,
}: BookingDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = () => {
    setSubmitSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSubmitSuccess(false);
    setName("");
    setEmail("");
    setGuests("");
    setEventType("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <SuccessMessage onClose={handleClose} selectedDate={selectedDate} />
        ) : (
          <BookingForm
            name={name}
            email={email}
            guests={guests}
            eventType={eventType}
            onNameChange={setName}
            onEmailChange={setEmail}
            onGuestsChange={setGuests}
            onEventTypeChange={setEventType}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface SuccessMessageProps {
  onClose: () => void;
  selectedDate?: Date;
}

function SuccessMessage({ onClose, selectedDate }: SuccessMessageProps) {
  return (
    <div className="py-8 text-center space-y-4">
      <p className="text-2xl font-bold text-green-600">Inquiry Sent!</p>
      <p className="text-gray-600">
        Thank you! We&apos;ll contact you soon about{" "}
        {selectedDate?.toLocaleDateString("en-CA")}.
      </p>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}

interface BookingFormProps {
  name: string;
  email: string;
  guests: string;
  eventType: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

function BookingForm({
  name,
  email,
  guests,
  eventType,
  onNameChange,
  onEmailChange,
  onGuestsChange,
  onEventTypeChange,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  return (
    <>
      <div className="grid gap-4 py-4">
        <FormField
          label="Name"
          id="name"
          placeholder="Your name"
          value={name}
          onChange={onNameChange}
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={onEmailChange}
        />
        <FormField
          label="Guests"
          id="guests"
          type="number"
          placeholder="100"
          value={guests}
          onChange={onGuestsChange}
        />
        <TextareaField
          label="Event Type"
          id="type"
          placeholder="Wedding, corporate, birthday..."
          value={eventType}
          onChange={onEventTypeChange}
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit Inquiry</Button>
      </DialogFooter>
    </>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="col-span-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function TextareaField({
  label,
  id,
  placeholder,
  value,
  onChange,
}: TextareaFieldProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        className="col-span-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
