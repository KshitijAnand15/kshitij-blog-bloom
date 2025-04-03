
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Project, { ProjectProps } from '../components/Project';
import { cmsService } from '../services/cmsService';

const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await cmsService.getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Projects</h1>
        <p className="text-lg text-foreground/80 mb-8">
          A collection of my work, side projects, and experiments.
        </p>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
