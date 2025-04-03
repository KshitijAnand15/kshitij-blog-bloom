
import React from 'react';

export interface BookmarkProps {
  id: string;
  title: string;
  url: string;
  description: string;
  imageUrl?: string;
  category: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, url, description }) => {
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

export default Bookmark;
