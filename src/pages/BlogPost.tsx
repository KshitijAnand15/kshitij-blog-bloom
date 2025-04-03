
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { cmsService } from '../services/cmsService';
import { BlogPostProps } from '../components/BlogPost';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const postData = await cmsService.getBlogPostBySlug(slug);
          setPost(postData || null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p>Loading post...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-medium mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-accent hover:underline">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-6">
          <Link to="/blog" className="text-accent hover:underline">
            ← Back to Blog
          </Link>
        </div>
        
        <article>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-8">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
          </div>
          
          <div className="prose prose-lg max-w-none">
            {/* This would be the actual content from the CMS */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>Second Heading</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
