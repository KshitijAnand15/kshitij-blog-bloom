
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import POWItem, { POWItemProps } from '../components/POWItem';
import { cmsService } from '../services/cmsService';

const POW = () => {
  const [items, setItems] = useState<POWItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await cmsService.getPOWItems();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching POW items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Perspective of the Week</h1>
        <p className="text-lg text-foreground/80 mb-8">
          Weekly insights, observations, and thoughts on various topics.
          Subscribe to my <a href="https://kshitijanand.substack.com/" target="_blank" rel="noreferrer" className="text-accent hover:underline">
            newsletter
          </a> to get these delivered directly to your inbox.
        </p>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading content...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="divide-y divide-muted">
            {items.map((item) => (
              <POWItem key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No POW items found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default POW;
