
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Bookmark, { BookmarkProps } from '../components/Bookmark';
import { cmsService } from '../services/cmsService';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';

const ITEMS_PER_PAGE = 15;

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarksData = await cmsService.getBookmarks();
        setBookmarks(bookmarksData);
        setTotalPages(Math.ceil(bookmarksData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const paginatedBookmarks = bookmarks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Bookmarks</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Loading bookmarks...</p>
          </div>
        ) : paginatedBookmarks.length > 0 ? (
          <>
            <div>
              {paginatedBookmarks.map((bookmark) => (
                <Bookmark key={bookmark.id} {...bookmark} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.max(prev - 1, 1));
                        }} 
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === index + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        }} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
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
