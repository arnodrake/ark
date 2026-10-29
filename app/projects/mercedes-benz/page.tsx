import ProjectCaseStudyLayout, { caseStudyMetadata } from "@/components/ProjectCaseStudyLayout";

export const generateMetadata = () => caseStudyMetadata("mercedes-benz");

export default function MercedesBenz() {
  return (
    <ProjectCaseStudyLayout
      slug="mercedes-benz"
      year="2024"
      readMinutes={6}
      heroSrc="/projects/Benz.jpg"
      media={{
        1: { src: "/projects/Benz2.jpg" },
        2: { src: "/projects/Benz3.jpg", imageFirst: true },
      }}
    />
  );
}
