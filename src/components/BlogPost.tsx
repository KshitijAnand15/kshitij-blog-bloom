
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
    <article className="blog-post">
      <h2>
        <Link to={`/blog/${slug}`} className="blog-post-title">
          {title}
        </Link>
      </h2>
      <div className="blog-post-meta">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <p className="text-foreground/80">{excerpt}</p>
      <div className="mt-4">
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
