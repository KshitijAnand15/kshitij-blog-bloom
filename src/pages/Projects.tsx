import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Project from '../components/Project'; // ✅ Removed explicit type import (optional)
import { getAllProjects } from '@/lib/getProject';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

const ITEMS_PER_PAGE = 15;

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        console.log("📦 Loaded projects:", projectsData);
        setProjects(projectsData);
        setTotalPages(Math.ceil(projectsData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Projects</h1>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading projects...</p>
          </div>
        ) : paginatedProjects.length > 0 ? (
          <>
            <div className="space-y-6">
              {paginatedProjects.map((project) => (
                <Project
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
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
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
