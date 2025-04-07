
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
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="md:w-36 text-gray-600 mb-1 md:mb-0">{formattedDate}</div>
        <div>
          <Link 
            to={`/pow/${id}`}
            className="text-gray-800 font-medium hover:text-blue-600"
          >
            {title}
          </Link>
          <div className="text-gray-700 mt-1">{content}</div>
          {link && (
            <div className="mt-2">
              <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                External Link →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POWItem;
