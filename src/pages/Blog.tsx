import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BlogPost from "../components/BlogPost";
import { getAllPosts } from "@/lib/getPost"; // <-- Your markdown loader
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const ITEMS_PER_PAGE = 15;

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts(); // ✅ use .md instead of cmsService
        setPosts(postsData);
        setTotalPages(Math.ceil(postsData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="py-4">
        <h1 className="font-medium text-2xl mb-4">Blog</h1>

        {loading ? (
          <div className="text-center py-10">
            <p>Loading posts...</p>
          </div>
        ) : paginatedPosts.length > 0 ? (
          <>
            <div>
              {paginatedPosts.map((post) => (
                <BlogPost
                  key={post.slug}
                  id={post.slug}
                  title={post.title}
                  slug={post.slug}
                  date={post.date}
                  excerpt={post.description || ""}
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          );
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
            <p>No blog posts found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
