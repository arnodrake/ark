import ProjectCaseStudyLayout, {
  ProjectMediaSection,
  ProjectSection,
} from "@/components/ProjectCaseStudyLayout";

export default function TeslaGigaTexas() {
  return (
    <ProjectCaseStudyLayout
      title="Building the Core of Tomorrow's Gigafactory"
      subtitle="Electrical and automation infrastructure supporting Tesla's Robotaxi production expansion in Texas."
      location="Austin, Texas"
      year="2025"
      readTime="6 min read"
      heroSrc="/projects/gigatexas.jpg"
      heroAlt="Tesla Giga Texas — aerial view"
    >
      <ProjectSection title="A Factory Built for Scale">
        <p>
          Tesla Giga Texas represents one of the most ambitious manufacturing facilities in North America, bringing together robotics, automation, and high-volume production under a single roof.
        </p>
        <p>
          Prior to the formation of Ark Automation Inc., our team participated in electrical and automation installation activities supporting production expansion within the facility. Working in an active construction environment, we helped deliver the infrastructure required to support next-generation manufacturing systems.
        </p>
      </ProjectSection>

      <ProjectMediaSection
        title="Cable Tray & Structural Installation"
        imageSrc="/projects/gigatexas2.jpg"
        imageAlt="Cable tray and structural support frameworks at Tesla Giga Texas"
        imagePosition="50% 35%"
      >
        <p>
          Reliable manufacturing begins with reliable infrastructure.
        </p>
        <p>
          Our work included the installation of cable tray systems and structural support frameworks throughout production areas. These systems provided organized routing pathways for power, control, and communication cabling while maintaining accessibility for future maintenance and expansion.
        </p>
        <p>
          Working alongside multiple trades, installations were coordinated to support ongoing construction activities and maintain project progress across different production zones.
        </p>
      </ProjectMediaSection>

      <ProjectMediaSection
        title="Electrical & Automation Infrastructure"
        imageSrc="/projects/gigatexas3.jpg"
        imageAlt="Electrical and automation infrastructure at Tesla Giga Texas"
        imageFirst
        imagePosition="50% 15%"
      >
        <p>
          Our team performed electrical and automation-related installations supporting production equipment, power distribution systems, grounding networks, and control infrastructure.
        </p>
        <p>
          More than 60,000 feet of cable were routed, secured, labeled, and verified throughout the project. Every installation was completed according to project requirements, ensuring consistency, reliability, and long-term maintainability.
        </p>
        <p>
          From cable routing and equipment connections to grounding and support systems, attention to detail remained critical throughout every phase of execution.
        </p>
      </ProjectMediaSection>

      <ProjectSection title="Coordinated Field Execution">
        <p>
          Large-scale manufacturing projects depend on precise coordination between multiple disciplines.
        </p>
        <p>
          Our team worked alongside structural, mechanical, automation, and logistics trades to support installation schedules across active work areas. Daily coordination helped ensure that electrical infrastructure, equipment support systems, and production-related installations progressed efficiently without disrupting parallel construction activities.
        </p>
        <p>
          This collaborative approach allowed work to advance safely while maintaining project momentum.
        </p>
      </ProjectSection>

      <ProjectSection title="Safety & Quality">
        <p>
          Safety and quality were fundamental throughout every stage of installation.
        </p>
        <p>
          All work was performed in accordance with site safety requirements and supported by documented inspections, equipment checks, and established work procedures. Consistent attention to workmanship helped ensure reliable installations while maintaining the standards required within a high-profile manufacturing environment.
        </p>
      </ProjectSection>

      <ProjectSection title="Project Impact">
        <p>
          The infrastructure installed during this project supports manufacturing operations within Tesla's Giga Texas facility and contributes to the ongoing expansion of advanced vehicle production capabilities.
        </p>
        <p>
          This experience reflects the industrial installation expertise, field coordination, and execution standards that later became part of the foundation of Ark Automation Inc.
        </p>
      </ProjectSection>
    </ProjectCaseStudyLayout>
  );
}
