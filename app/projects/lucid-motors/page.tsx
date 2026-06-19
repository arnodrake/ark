import ProjectCaseStudyLayout, {
  ProjectMediaSection,
  ProjectSection,
} from "@/components/ProjectCaseStudyLayout";

export default function LucidMotors() {
  return (
    <ProjectCaseStudyLayout
      title="Precision in Motion"
      subtitle="High-performance electrical and control installations across Lucid's advanced manufacturing environment."
      location="Casa Grande, Arizona"
      year="2024"
      readTime="6 min read"
      heroSrc="/projects/Lucid.jpg"
      heroAlt="Lucid Motors — Casa Grande, Arizona facility"
    >
      <ProjectSection title="Manufacturing Built Around Precision">
        <p>
          Lucid Motors has established itself as one of the most innovative electric vehicle manufacturers, combining advanced engineering, automation, and production quality within a highly controlled manufacturing environment.
        </p>
        <p>
          Prior to the formation of Ark Automation Inc., our team participated in electrical and automation installation activities supporting manufacturing operations within Lucid's Arizona facility.
        </p>
        <p>
          Working in active production areas, our team helped deliver the infrastructure required to support reliable, high-precision vehicle manufacturing.
        </p>
      </ProjectSection>

      <ProjectMediaSection
        title="Electrical & Control Installations"
        imageSrc="/projects/Lucid2.jpg"
        imageAlt="Electrical and control installations at Lucid Motors"
        imagePosition="50% 25%"
      >
        <p>
          Modern manufacturing relies on seamless integration between power, controls, communication networks, and production equipment.
        </p>
        <p>
          Our work included electrical installations, control wiring, network infrastructure, equipment connections, and cable management systems supporting manufacturing operations throughout the facility.
        </p>
        <p>
          Power, control, and communication cabling were routed, terminated, labeled, and verified according to project requirements, ensuring consistent installation quality and long-term maintainability.
        </p>
      </ProjectMediaSection>

      <ProjectMediaSection
        title="Supporting Advanced Automation"
        imageSrc="/projects/Lucid3.jpg"
        imageAlt="Advanced automation systems at Lucid Motors"
        imageFirst
        imagePosition="top"
      >
        <p>
          Across production areas, our team performed installation work associated with automated manufacturing equipment, conveyor systems, material handling operations, and industrial control infrastructure.
        </p>
        <p>
          Attention to cable routing, grounding, labeling, and equipment connectivity helped maintain reliability while supporting the demanding requirements of a modern EV production environment.
        </p>
        <p>
          Every installation was completed with a focus on accuracy, consistency, and workmanship.
        </p>
      </ProjectMediaSection>

      <ProjectSection title="Working Within an Active Production Facility">
        <p>
          Executing work inside a live manufacturing environment requires careful planning and coordination.
        </p>
        <p>
          Our team worked alongside production personnel, contractors, and multiple trades to complete installation activities while minimizing disruption to ongoing operations.
        </p>
        <p>
          Daily communication and field coordination helped maintain project schedules while supporting safe and efficient execution across active work areas.
        </p>
      </ProjectSection>

      <ProjectSection title="Safety & Quality">
        <p>
          Safety and quality remained central throughout every phase of the project.
        </p>
        <p>
          All installation activities were performed in accordance with site requirements and supported by inspections, testing, verification procedures, and established work practices.
        </p>
        <p>
          Consistent attention to detail helped ensure reliable installations while maintaining the standards expected within a high-performance manufacturing facility.
        </p>
      </ProjectSection>

      <ProjectSection title="Project Impact">
        <p>
          The infrastructure installed by our team contributes to manufacturing operations within Lucid's Arizona facility and supports the continued growth of advanced electric vehicle production.
        </p>
        <p>
          This project reflects the field installation expertise, industrial execution capabilities, and commitment to quality that later became part of the foundation of Ark Automation Inc.
        </p>
      </ProjectSection>
    </ProjectCaseStudyLayout>
  );
}
