import { FaqSection } from "@/components/ui/21dev/faq-section";

const DEMO_FAQS = [
  {
    question: "What types of photography services do you offer?",
    answer:
      "I specialize in a variety of photography services, including weddings, portraits, corporate events, and creative projects. Each session is tailored to capture your vision and unique moments.",
  },
  {
    question: "How do I book a photography session or event?",
    answer: "Booking is easy! You can contact me via the website or phone to discuss your requirements. Once we confirm availability, I provide a customized package and contract to secure your date.",
  },
  {
    question: "Do you provide support or guidance during the photoshoot?",
    answer:
      "Absolutely! I guide clients throughout the session to ensure natural poses and capture the best moments. For events, I coordinate with organizers to seamlessly cover key highlights without disrupting the flow.",
  },
];

export function FaqSectionComponent() {
  return (
    <FaqSection
      className="px-4"
      title="Frequently Asked Questions"
      description="Everything you need to know about our platform"
      items={DEMO_FAQS}
      contactInfo={{
        title: "Still have questions?",
        description: "We're here to help you",
        buttonText: "Contact Support",
        onContact: () => console.log("Contact support clicked"),
      }}
    />
  );
}
