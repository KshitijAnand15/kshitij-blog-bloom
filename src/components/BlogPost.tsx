
import React from 'react';
import { Link } from 'react-router-dom';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ id, title, excerpt, date, slug }) => {
  return (
    <article className="mb-8 pb-8 border-b border-muted last:border-0">
      <h2>
        <Link to={`/blog/${slug}`} className="text-xl md:text-2xl font-medium mb-2 hover:text-accent transition-colors">
          {title}
        </Link>
      </h2>
      <div className="text-sm text-muted-foreground mb-3">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <p className="text-foreground/80 mb-4">{excerpt}</p>
      <div className="mt-2">
        <Link 
          to={`/blog/${slug}`} 
          className="text-accent hover:underline font-medium"
        >
          Read more
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
