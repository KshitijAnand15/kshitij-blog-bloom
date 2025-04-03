
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
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Projects</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div>
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
