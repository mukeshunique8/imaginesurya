"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useThemeColors } from "@/components/providers/useThemeColors";
import { showError, showSuccess } from "@/lib/helpers/swalHelper";

export default function PhotographyEventForm() {
  const { primary, secondary } = useThemeColors();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSubmitted(false);

    try {
      const response = await fetch("https://formcarry.com/s/SdbdJvHFqQT", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, eventDate, location, message }),
      });

      const data = await response.json();

      if (data.code === 200) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setEventDate("");
        setLocation("");
        setMessage("");
        showSuccess("We received your submission, thank you!");
      } else if (data.code === 422) {
        showError(data.message, "Validation Error");
      } else {
        showError(data.message || "Something went wrong!");
      }
    } catch (err: any) {
      showError(err.message || "Network error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-6 md:p-10 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl text-primary md:text-4xl font-bold text-center" data-aos="fade-up">
        Event Inquiry
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-aos="fade-right">
          <Label htmlFor="name" className="mb-2">
            Full Name
          </Label>
          <Input type="text" id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="  border-none focus:ring-2 focus:ring-primary" required />
        </div>

        <div data-aos="fade-left">
          <Label htmlFor="email" className="mb-2">
            Email Address
          </Label>
          <Input type="email" id="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="  border-none focus:ring-2 focus:ring-primary" required />
        </div>

        <div data-aos="fade-right">
          <Label htmlFor="eventDate" className="mb-2">
            Event Date
          </Label>
          <Input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="  border-none focus:ring-2 focus:ring-primary" required />
        </div>

        <div data-aos="fade-left">
          <Label htmlFor="location" className="mb-2">
            Event Location
          </Label>
          <Input
            type="text"
            id="location"
            placeholder="City or venue"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="  border-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div data-aos="fade-up">
        <Label htmlFor="message" className="mb-2">
          Additional Details
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your event..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="  border-none focus:ring-2 focus:ring-primary"
          rows={5}
        />
      </div>

      {error && (
        <p className="text-red-500 font-medium text-center" data-aos="fade-up">
          {error}
        </p>
      )}

      <div className="flex justify-center" data-aos="fade-up">
        <Button type="submit" className="bg-primary hover:bg-secondary  px-6 py-3 rounded-lg shadow-lg transition-colors duration-300">
          Submit Inquiry
        </Button>
      </div>

      {submitted && (
        <p className="text-green-400 text-center font-medium" data-aos="fade-up">
          Your inquiry has been sent successfully!
        </p>
      )}
    </form>
  );
}
