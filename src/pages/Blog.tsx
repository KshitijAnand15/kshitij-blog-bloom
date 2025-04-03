
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
      {loading ? (
        <div className="text-center py-10">
          <p>Loading posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p>No blog posts found.</p>
        </div>
      )}
    </Layout>
  );
};

export default Blog;
