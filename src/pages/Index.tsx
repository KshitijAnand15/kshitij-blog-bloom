import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllPosts } from '@/lib/getPost';
import { BlogPostProps } from '@/components/BlogPost';

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const all = await getAllPosts();
      setRecentPosts(all.slice(0, 3));
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="py-6 px-4 sm:py-10 sm:px-0">
        <div className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/80 space-y-4">
          <p>Hi, I'm Kshitij Anand</p>

          <p>
            I'm a writer and product manager currently working on B2B SaaS products at Reliance Jio.
            Started as a Civil engineer, went into sales, did my MBA in Operations Management and now an operator in tech.
          </p>

          <p>
            I try to explore any and every topic that the kid in me is curious about. Tech, Social Sciences,
            and various forms of storytelling (Be it cinema, books, comics you name it).
          </p>

          <p>
            Co-wrote a Crime thriller novella named{' '}
            <a
              href="https://www.amazon.in/Papercut-Kshitij-Anand/dp/B09QSDB78J"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Papercut
            </a>{' '}
            in 2021 which went on to sell 100 odd copies. Vibe coded this website on React and Vite.
          </p>

          <p>
            I also write a newsletter called{' '}
            <a
              href="https://kshitijanand.substack.com/"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              The Potatoist
            </a>{' '}
            where I try my best to understand myself and write about the world we live in. Oh and I also write fiction here.
          </p>

          <p>
            This website is my attempt to think more, write more and explore my curiosities so the kid in me is happy.
          </p>

          <p>Some signposts to guide you:</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            <li>
              <Link to="/blog" className="text-accent hover:underline">
                Blog
              </Link>: Thoughts on things I found interesting or sparked my curiosities
            </li>
            <li>
              <Link to="/pow" className="text-accent hover:underline">
                Proof of Work (POW)
              </Link>: A view of my career as a product manager and hopefully as a writer soon.
            </li>
            <li>
              <Link to="/projects" className="text-accent hover:underline">
                Projects
              </Link>: Learning things by building products, researching random topics and daydreaming about telling stories.
            </li>
            <li>
              <Link to="/bookmarks" className="text-accent hover:underline">
                Bookmarks
              </Link>: Some timeless reads that have helped me become a better individual, a better professional and more self-aware in general.
            </li>
          </ul>
        </div>

        <div className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">Recent Posts</h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post.slug} className="border-l-2 border-accent pl-4">
                <h3 className="text-lg sm:text-xl font-medium">
                  <Link to={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/blog" className="text-accent hover:underline font-medium">
              View all posts →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
