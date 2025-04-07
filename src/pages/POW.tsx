
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import POWItem, { POWItemProps } from '../components/POWItem';
import { cmsService } from '../services/cmsService';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';

const ITEMS_PER_PAGE = 15;

const POW = () => {
  const [items, setItems] = useState<POWItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await cmsService.getPOWItems();
        setItems(itemsData);
        setTotalPages(Math.ceil(itemsData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching POW items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Proof of Work</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Loading content...</p>
          </div>
        ) : paginatedItems.length > 0 ? (
          <>
            <div>
              {paginatedItems.map((item) => (
                <POWItem key={item.id} {...item} />
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
          <div className="text-center py-10">
            <p>No Proof of Work items found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default POW;
