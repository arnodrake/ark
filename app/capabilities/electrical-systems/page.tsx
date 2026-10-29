import CapabilityLayout, { capabilityMetadata } from "@/components/CapabilityLayout";

export const generateMetadata = () => capabilityMetadata("electrical-systems");

export default function ElectricalSystemsPage() {
  return <CapabilityLayout slug="electrical-systems" />;
}
