
import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

const Project: React.FC<ProjectProps> = ({ title, description, link, imageUrl }) => {
  return (
    <Card className="h-full transition-all duration-200 hover:border-accent">
      <CardContent className="p-5">
        {imageUrl && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-foreground/80 mb-4">{description}</p>
      </CardContent>
      {link && (
        <CardFooter className="pt-0 pb-5 px-5">
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer" 
            className="text-accent hover:underline font-medium"
          >
            View Project
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default Project;
