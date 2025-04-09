import React from 'react';
import { Link } from 'react-router-dom';

export interface ProjectProps {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const Project: React.FC<ProjectProps> = ({ slug, title, description }) => {
  // fallback in case slug is missing
  const projectLink = slug ? `/projects/${slug}` : '#';

  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <Link 
          to={projectLink}
          className="text-gray-800 hover:text-blue-600"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default Project;
