import { RouteExperience } from "@/components/common/RouteExperience";
import { LandingExperience } from "@/components/landing/LandingExperience";

export default function LandingPage() {
  return (
    <RouteExperience route="landing">
      <LandingExperience />
    </RouteExperience>
  );
}
