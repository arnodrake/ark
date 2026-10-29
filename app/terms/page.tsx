import LegalLayout, { legalMetadata } from "@/components/LegalLayout";

export const generateMetadata = () => legalMetadata("terms");

export default function TermsPage() {
  return <LegalLayout doc="terms" />;
}
