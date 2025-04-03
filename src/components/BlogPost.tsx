
import React from 'react';
import { Link } from 'react-router-dom';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, slug }) => {
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
          <Link 
            to={`/blog/${slug}`}
            className="text-blue-600 hover:underline"
          >
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
