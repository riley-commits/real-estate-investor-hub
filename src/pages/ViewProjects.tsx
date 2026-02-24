import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const ViewProjects = () => {
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">Available Projects</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};

export default ViewProjects;
