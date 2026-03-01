import { SKILLS } from "@/app/data/Skills";
import { FrontendSection } from "@/app/components/ui/frontendSection";
import { BackendSection } from "@/app/components/ui/backendSection";
import { ToolsSection } from "@/app/components/ui/toolsSection";
import { useSkills } from "@/hooks/useSkillsHandle";

export function Skills() {
  const { isActive, handleIsActive } = useSkills();
  return (
    <section id="skills" className="p-8">
      <div className="section-container">
        <div className="section-child">
          {/* header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">My Skills</h1>

          </div>
          {/* skills */}
          <div className="flex gap-4">
            {SKILLS.map((skill) => (
              <button key={skill} onClick={() => handleIsActive(skill)} className="btn-primary">
                {skill}
              </button>
            ))}
          </div>

          <div>
            {isActive === "Frontend" && <FrontendSection />}
            {isActive === "Backend" && <BackendSection />}
            {isActive === "Tools" && <ToolsSection />}
          </div>
        </div>
      </div>
    </section>
  );
}
