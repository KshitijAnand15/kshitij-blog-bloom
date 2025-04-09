import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getPostBySlug } from "@/lib/getPost";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const postData = await getPostBySlug(slug);
          setPost(postData);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError(true);
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

  if (error || !post) {
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
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* ✅ Render Markdown content with proper spacing and theme support */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
