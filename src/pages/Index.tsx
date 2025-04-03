
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-medium mb-6">
          Hi, I'm Kshitij Anand
        </h1>
        <div className="max-w-2xl text-lg text-foreground/80 space-y-4">
          <p>
            I'm a designer and developer focused on creating meaningful digital experiences.
            This is my personal corner of the internet where I share my thoughts,
            projects, and things I find interesting.
          </p>
          <p>
            Feel free to explore my <Link to="/blog" className="text-accent hover:underline">blog</Link>,
            check out my <Link to="/projects" className="text-accent hover:underline">projects</Link>, 
            or browse through my <Link to="/bookmarks" className="text-accent hover:underline">bookmarks</Link>.
          </p>
          <p>
            I also write a weekly newsletter called <a href="https://kshitijanand.substack.com/" 
            className="text-accent hover:underline" target="_blank" rel="noreferrer">POW (Perspective of the Week)</a> where
            I share my thoughts on design, technology, and life.
          </p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-6">Recent Posts</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <h3 className="text-xl font-medium">
                <Link to="/blog/react-typescript" className="hover:text-accent">
                  Getting Started with React and TypeScript
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">April 15, 2023</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <h3 className="text-xl font-medium">
                <Link to="/blog/effective-ui-design" className="hover:text-accent">
                  Designing Effective User Interfaces
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">March 22, 2023</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <h3 className="text-xl font-medium">
                <Link to="/blog/future-web-dev" className="hover:text-accent">
                  The Future of Web Development
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">February 8, 2023</p>
            </div>
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
