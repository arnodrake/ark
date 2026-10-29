import CapabilityLayout, { capabilityMetadata } from "@/components/CapabilityLayout";

export const generateMetadata = () => capabilityMetadata("pneumatic-controls");

export default function PneumaticControlsPage() {
  return <CapabilityLayout slug="pneumatic-controls" />;
}
