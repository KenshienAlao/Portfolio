import { Skill } from "@/service/skill.service";

interface props {
  skills: Skill[];
  skillsByCategory: Record<string, number>;
  maxCategoryCount: number;
}

export function Skills({ skills, skillsByCategory, maxCategoryCount }: props) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-4 flex items-center justify-between text-sm font-bold text-text-primary">
        <span>Skills by Category</span>
        <span className="text-xs font-normal text-text-secondary">
          {skills.length} total
        </span>
      </h3>

      {Object.keys(skillsByCategory).length === 0 ? (
        <p className="py-4 text-xs text-text-secondary">No skills added yet.</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(skillsByCategory).map(([category, count]) => (
            <div key={category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{category}</span>
                <span className="font-bold text-text-primary">{count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{
                    width: `${(count / maxCategoryCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
