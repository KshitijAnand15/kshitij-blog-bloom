
import React from 'react';
import { Link } from 'react-router-dom';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

const Project: React.FC<ProjectProps> = ({ id, title, description, link }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <Link 
          to={`/projects/${id}`}
          className="text-gray-800 hover:text-blue-600"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-700">
        {description}
      </p>
      {link && (
        <div className="mt-2">
          <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
            External Link →
          </a>
        </div>
      )}
    </div>
  );
};

export default Project;
