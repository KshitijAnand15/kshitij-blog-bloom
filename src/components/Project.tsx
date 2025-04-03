
import React from 'react';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

const Project: React.FC<ProjectProps> = ({ title, description, link }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default Project;
