
import React from 'react';

export interface BookmarkProps {
  id: string;
  title: string;
  url: string;
  description: string;
  imageUrl?: string;
  category: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, url, description, category }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
          {title}
        </a>
      </h3>
      <p className="text-gray-700 mb-1">
        {description}
      </p>
      {category && (
        <span className="text-sm text-gray-500">
          {category}
        </span>
      )}
    </div>
  );
};

export default Bookmark;
