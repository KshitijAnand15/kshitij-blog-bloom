
import React from 'react';

export interface POWItemProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

const POWItem: React.FC<POWItemProps> = ({ title, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className="py-3">
      <div className="flex">
        <div className="w-36 text-gray-600">{formattedDate}</div>
        <div>
          <span className="text-gray-800">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default POWItem;
