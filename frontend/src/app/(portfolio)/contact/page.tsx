import { Contact } from "@/views/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kenshien Alao",
  description:
    "Get in touch with Kenshien Alao for freelance projects, internships, and full-time web development opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
