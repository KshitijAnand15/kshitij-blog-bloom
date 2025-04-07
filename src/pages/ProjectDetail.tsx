
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { cmsService } from '../services/cmsService';
import { ProjectProps } from '../components/Project';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const projectData = await cmsService.getProjectById(id);
          setProject(projectData || null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p>Loading project...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-medium mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="text-accent hover:underline">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-6">
          <Link to="/projects" className="text-accent hover:underline">
            ← Back to Projects
          </Link>
        </div>
        
        <article>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">{project.title}</h1>
          
          <div className="prose prose-lg max-w-none mt-6">
            <p>{project.description}</p>
            {project.link && (
              <p className="mt-6">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  View Project →
                </a>
              </p>
            )}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
