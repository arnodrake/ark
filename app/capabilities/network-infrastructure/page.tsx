import CapabilityLayout, { capabilityMetadata } from "@/components/CapabilityLayout";

export const generateMetadata = () => capabilityMetadata("network-infrastructure");

export default function NetworkInfrastructurePage() {
  return <CapabilityLayout slug="network-infrastructure" />;
}
