
import React from 'react';

export interface BookmarkProps {
  id: string;
  title: string;
  url: string;
  description: string;
  imageUrl?: string;
  category: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, url, description, imageUrl, category }) => {
  return (
    <div className="bookmark-item">
      {imageUrl && (
        <div className="md:w-1/4 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-24 object-cover rounded-md"
          />
        </div>
      )}
      <div className={imageUrl ? "md:w-3/4" : "w-full"}>
        <div className="text-sm text-accent uppercase font-medium mb-1">{category}</div>
        <h3 className="text-lg font-medium mb-1">
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-accent"
          >
            {title}
          </a>
        </h3>
        <p className="text-foreground/80 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Bookmark;
