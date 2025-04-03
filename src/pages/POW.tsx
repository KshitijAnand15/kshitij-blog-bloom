
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
      {loading ? (
        <div className="text-center py-10">
          <p>Loading content...</p>
        </div>
      ) : items.length > 0 ? (
        <div>
          {items.map((item) => (
            <POWItem key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p>No POW items found.</p>
        </div>
      )}
    </Layout>
  );
};

export default POW;
