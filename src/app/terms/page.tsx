import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service", robots: { index: false } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>Add your terms of service here: the rules for using VYNORA, community conduct and the responsibilities of both sides.</p>
      <p>Have it reviewed by a qualified legal professional before publishing.</p>
    </LegalPage>
  );
}
