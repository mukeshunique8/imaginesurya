"use client";
import gsap from "gsap";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { name: "Alice", feedback: "Stunning shots, super professional!" },
  { name: "Raj", feedback: "Captured our wedding perfectly!" },
  { name: "Lina", feedback: "Every photo is magical." },
];

export default function TestimonialSection() {
  useEffect(() => {
    gsap.fromTo(".testimonial", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.3 });
  }, []);

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-10">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <Card key={i} className="testimonial glass shadow-lg">
            <CardContent className="p-6">
              <p className="italic">"{t.feedback}"</p>
              <h4 className="mt-4 font-semibold">— {t.name}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
