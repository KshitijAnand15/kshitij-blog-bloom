
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { cmsService } from '../services/cmsService';
import { POWItemProps } from '../components/POWItem';

const POWDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<POWItemProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPOW = async () => {
      try {
        if (id) {
          const itemData = await cmsService.getPOWItemById(id);
          setItem(itemData || null);
        }
      } catch (error) {
        console.error('Error fetching POW item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPOW();
  }, [id]);

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
              day: 'numeric'
            })}
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>{item.content}</p>
            {item.link && (
              <p className="mt-6">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  View Resource →
                </a>
              </p>
            )}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default POWDetail;
