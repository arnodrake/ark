import CapabilityLayout, { capabilityMetadata } from "@/components/CapabilityLayout";

export const generateMetadata = () => capabilityMetadata("automation-integration");

export default function AutomationIntegrationPage() {
  return <CapabilityLayout slug="automation-integration" />;
}
