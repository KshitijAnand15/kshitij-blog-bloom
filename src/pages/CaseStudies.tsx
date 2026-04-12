import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Project from '../components/Project';
import { getAllCaseStudies } from '@/lib/getCaseStudy';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

const ITEMS_PER_PAGE = 15;

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const caseStudiesData = await getAllCaseStudies();
        setCaseStudies(caseStudiesData);
        setTotalPages(Math.ceil(caseStudiesData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const paginatedCaseStudies = caseStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Case Studies</h1>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading case studies...</p>
          </div>
        ) : paginatedCaseStudies.length > 0 ? (
          <>
            <div className="space-y-6">
              {paginatedCaseStudies.map((caseStudy) => (
                <Project
                  key={caseStudy.slug}
                  slug={caseStudy.slug}
                  title={caseStudy.title}
                  description={caseStudy.description}
                  basePath="/case-studies"
                />
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
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
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
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
            <p>No case studies found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaseStudies;
