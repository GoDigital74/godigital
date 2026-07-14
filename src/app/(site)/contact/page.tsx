import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | GoDigital",
  description: "Ready to build your growth engine? Drop us a line, book a meeting, or visit our studio in Tech City.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}