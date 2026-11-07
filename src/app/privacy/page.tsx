import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Add your privacy policy here: what information VYNORA collects, how it is used, how long it is kept and how people can contact you about it.</p>
      <p>Have it reviewed by a qualified legal professional before publishing.</p>
    </LegalPage>
  );
}
