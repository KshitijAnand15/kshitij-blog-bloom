import React from 'react';
import { Link } from 'react-router-dom';

export interface POWItemProps {
  slug: string; // ✅ uses slug instead of id
  title: string;
  content: string; // contains parsed HTML from Markdown
  date: string;
  imageUrl?: string;
}

const POWItem: React.FC<POWItemProps> = ({ slug, title, content }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <Link 
          to={`/pow/${slug}`} 
          className="text-gray-800 hover:text-blue-600"
        >
          {title}
        </Link>
      </h3>
      <div
        className="text-gray-700 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default POWItem;
