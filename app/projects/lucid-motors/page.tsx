import ProjectCaseStudyLayout, { caseStudyMetadata } from "@/components/ProjectCaseStudyLayout";

export const generateMetadata = () => caseStudyMetadata("lucid-motors");

export default function LucidMotors() {
  return (
    <ProjectCaseStudyLayout
      slug="lucid-motors"
      year="2024"
      readMinutes={6}
      heroSrc="/projects/Lucid.jpg"
      media={{
        1: { src: "/projects/Lucid2.jpg", position: "50% 25%" },
        2: { src: "/projects/Lucid3.jpg", position: "top", imageFirst: true },
      }}
    />
  );
}
