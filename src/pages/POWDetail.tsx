import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getPOWBySlug } from '@/lib/getPOW';

interface POWDetailType {
  title: string;
  content: string;
  date: string;
  slug: string;
}

const POWDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<POWDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPOW = async () => {
      if (!slug) {
        console.error("❌ Slug is undefined. Cannot fetch POW item.");
        setLoading(false);
        return;
      }

      try {
        const itemData = await getPOWBySlug(slug);
        setItem(itemData || null);
      } catch (error) {
        console.error("Error fetching POW item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPOW();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p>Loading content...</p>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-medium mb-4">Item Not Found</h1>
          <p className="mb-6">The proof of work item you're looking for doesn't exist.</p>
          <Link to="/pow" className="text-accent hover:underline">
            Back to POW
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-6">
          <Link to="/pow" className="text-accent hover:underline">
            ← Back to POW
          </Link>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">{item.title}</h1>
          <div className="text-sm text-muted-foreground mb-8">
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default POWDetail;
