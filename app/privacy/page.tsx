import LegalLayout, { legalMetadata } from "@/components/LegalLayout";

export const generateMetadata = () => legalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalLayout doc="privacy" />;
}
