import React from 'react';

export interface BookmarkProps {
  title: string;
  link: string; // ✅ changed from url → link
  description: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, link, description }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {title}
        </a>
      </h3>
      <p className="text-gray-700 mb-1">
        {description}
      </p>
    </div>
  );
};

export default Bookmark;
