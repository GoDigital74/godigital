import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ready to build your growth engine? Drop us a line, book a meeting, or visit our studio in Tech City.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | GoDigital",
    description: "Ready to build your growth engine? Drop us a line, book a meeting, or visit our studio in Tech City.",
    url: "https://godigitalagency.in/contact",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | GoDigital",
    description: "Ready to build your growth engine? Drop us a line, book a meeting, or visit our studio in Tech City.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
