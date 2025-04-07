
import React from 'react';
import { Link } from 'react-router-dom';

export interface POWItemProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  link?: string;
}

const POWItem: React.FC<POWItemProps> = ({ id, title, date, content, link }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <h3 className="font-medium text-lg mb-1">
        <Link 
          to={`/pow/${id}`}
          className="text-gray-800 hover:text-blue-600"
        >
          {title}
        </Link>
      </h3>
      <div className="text-gray-600 text-sm mb-1">{formattedDate}</div>
      <p className="text-gray-700">
        {content}
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

export default POWItem;
