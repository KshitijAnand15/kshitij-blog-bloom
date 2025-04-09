import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProjectBySlug } from '@/lib/getProject';

interface ProjectDetailType {
  title: string;
  content: string;
  slug: string;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        console.error("❌ Slug is undefined. Cannot fetch project.");
        setLoading(false);
        return;
      }

      try {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

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
          <div
            className="prose prose-lg max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
