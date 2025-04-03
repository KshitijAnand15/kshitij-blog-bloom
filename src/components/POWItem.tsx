
import React from 'react';

export interface POWItemProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

const POWItem: React.FC<POWItemProps> = ({ title, content, date, imageUrl }) => {
  return (
    <div className="mb-8 pb-8 border-b border-muted last:border-0">
      {imageUrl && (
        <div className="mb-4">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}
      <div className="text-sm text-muted-foreground mb-2">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <h2 className="text-xl md:text-2xl font-medium mb-3">{title}</h2>
      <div className="prose prose-sm max-w-none">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default POWItem;
