import EducationSection from "@/components/portfolio/education-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import PortfolioFooter from "@/components/portfolio/portfolio-footer";
import ProfileSection from "@/components/portfolio/profile-section";
import ProjectsSection from "@/components/portfolio/projects-section";
import SkillsSection from "@/components/portfolio/skills-section";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main>
        <ProfileSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
