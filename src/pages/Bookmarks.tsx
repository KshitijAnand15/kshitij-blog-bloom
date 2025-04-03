
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
      <div className="py-8">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">Bookmarks</h1>
        <p className="text-lg text-foreground/80 mb-8">
          Interesting articles, resources, and tools I've found around the web.
        </p>

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
          <div className="text-center py-10">
            <p>No bookmarks found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
