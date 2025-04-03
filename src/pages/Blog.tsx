
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BlogPost, { BlogPostProps } from '../components/BlogPost';
import { cmsService } from '../services/cmsService';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await cmsService.getBlogPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Blog</h1>
        <p className="text-lg text-foreground/80 mb-8">
          Thoughts, ideas, and explorations on design, development, and technology.
        </p>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="divide-y divide-muted">
            {posts.map((post) => (
              <BlogPost key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No blog posts found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
