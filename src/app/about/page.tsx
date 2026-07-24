import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Zero sugar on every can. Caffeine only on the flavors that say so. Nobody made that. So we made Ember.",
};

export default function AboutPage() {
  return <AboutContent />;
}
