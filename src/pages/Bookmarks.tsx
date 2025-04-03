
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Bookmark, { BookmarkProps } from '../components/Bookmark';
import { cmsService } from '../services/cmsService';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarksData = await cmsService.getBookmarks();
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Bookmarks</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Loading bookmarks...</p>
          </div>
        ) : bookmarks.length > 0 ? (
          <div>
            {bookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} {...bookmark} />
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p>No bookmarks found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
