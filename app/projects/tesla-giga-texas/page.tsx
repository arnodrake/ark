import ProjectCaseStudyLayout, { caseStudyMetadata } from "@/components/ProjectCaseStudyLayout";

export const generateMetadata = () => caseStudyMetadata("tesla-giga-texas");

export default function TeslaGigaTexas() {
  return (
    <ProjectCaseStudyLayout
      slug="tesla-giga-texas"
      year="2025"
      readMinutes={6}
      heroSrc="/projects/gigatexas.jpg"
      media={{
        1: { src: "/projects/gigatexas2.jpg", position: "50% 35%" },
        2: { src: "/projects/gigatexas3.jpg", position: "50% 15%", imageFirst: true },
      }}
    />
  );
}
