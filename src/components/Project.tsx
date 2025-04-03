
import React from 'react';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

const Project: React.FC<ProjectProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium text-lg mb-1">
        {title}:
      </h3>
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default Project;
