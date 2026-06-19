import ProjectCaseStudyLayout, {
  ProjectMediaSection,
  ProjectSection,
} from "@/components/ProjectCaseStudyLayout";

export default function MercedesBenz() {
  return (
    <ProjectCaseStudyLayout
      title="Innovation in Every Connection"
      subtitle="Delivering electrical and automation upgrades during critical production line modernization projects."
      location="South Carolina"
      year="2024"
      readTime="6 min read"
      heroSrc="/projects/Benz.jpg"
      heroAlt="Mercedes-Benz manufacturing facility — South Carolina"
    >
      <ProjectSection title="Modernizing Manufacturing at Speed">
        <p>
          In modern automotive manufacturing, production upgrades must often be completed within extremely limited shutdown windows. Every hour matters, and every delay impacts the schedule for restarting production.
        </p>
        <p>
          Prior to the formation of Ark Automation Inc., our team participated in electrical and automation installation activities supporting production line modernization within Mercedes-Benz manufacturing facilities.
        </p>
        <p>
          Working under compressed schedules and strict deadlines, our team helped execute critical infrastructure upgrades during planned production shutdowns.
        </p>
      </ProjectSection>

      <ProjectMediaSection
        title="Electrical & Automation Upgrades"
        imageSrc="/projects/Benz2.jpg"
        imageAlt="Electrical and automation upgrades at Mercedes-Benz"
      >
        <p>
          Production line modernization required new electrical infrastructure, equipment connections, automation-related installations, and supporting control systems to be integrated into existing manufacturing operations.
        </p>
        <p>
          Our work included cable routing, power distribution modifications, equipment connections, control wiring, support installations, and related electrical infrastructure upgrades throughout the project area.
        </p>
        <p>
          Installation activities were completed according to project requirements while maintaining compatibility with existing production systems.
        </p>
      </ProjectMediaSection>

      <ProjectMediaSection
        title="Executing Within Tight Shutdown Windows"
        imageSrc="/projects/Benz3.jpg"
        imageAlt="Production line work during a planned shutdown window"
        imageFirst
      >
        <p>
          One of the defining challenges of the project was time.
        </p>
        <p>
          With production temporarily halted, installation activities had to be completed within a limited shutdown period before manufacturing operations resumed.
        </p>
        <p>
          Our team worked alongside multiple trades in a fast-paced environment where careful planning, coordination, and execution were essential. Daily progress was closely monitored to ensure work remained on schedule and critical milestones were achieved before startup deadlines.
        </p>
        <p>
          The ability to execute efficiently under time pressure played a key role in the success of the project.
        </p>
      </ProjectMediaSection>

      <ProjectSection title="Coordination Across Multiple Trades">
        <p>
          Large-scale production upgrades require seamless coordination between electrical, mechanical, automation, and construction teams.
        </p>
        <p>
          Our team worked closely with other trades to sequence installations, resolve field challenges, and maintain progress throughout the shutdown period.
        </p>
        <p>
          Clear communication and disciplined execution helped keep work areas organized while supporting rapid project advancement.
        </p>
      </ProjectSection>

      <ProjectSection title="Safety & Quality">
        <p>
          Despite aggressive schedules, safety and quality remained uncompromised.
        </p>
        <p>
          All installation activities were performed in accordance with site requirements and supported by inspections, testing, verification procedures, and established work practices.
        </p>
        <p>
          Maintaining high standards of workmanship under compressed timelines was essential to delivering reliable results and supporting successful production startup.
        </p>
      </ProjectSection>

      <ProjectSection title="Project Impact">
        <p>
          The infrastructure upgrades completed during this project supported ongoing modernization efforts within Mercedes-Benz manufacturing operations.
        </p>
        <p>
          This project reflects the field installation expertise, industrial execution capabilities, and schedule-driven project experience that later became part of the foundation of Ark Automation Inc.
        </p>
        <p>
          By successfully executing electrical and automation upgrades during a limited shutdown window, our team helped support the continued evolution of advanced automotive manufacturing.
        </p>
      </ProjectSection>
    </ProjectCaseStudyLayout>
  );
}
