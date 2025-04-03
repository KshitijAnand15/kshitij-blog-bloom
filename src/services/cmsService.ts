
// This is a mock CMS service for demonstration purposes
// In a real application, you would connect to a real CMS API like Contentful, Sanity, etc.

import { BlogPostProps } from '../components/BlogPost';
import { ProjectProps } from '../components/Project';
import { BookmarkProps } from '../components/Bookmark';
import { POWItemProps } from '../components/POWItem';

// Mock blog posts data
const blogPosts: BlogPostProps[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up and use React with TypeScript for better development experience.',
    date: '2023-04-15',
    slug: 'react-typescript',
  },
  {
    id: '2',
    title: 'Designing Effective User Interfaces',
    excerpt: 'Principles and practices for creating intuitive and effective user interfaces.',
    date: '2023-03-22',
    slug: 'effective-ui-design',
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development for the next few years.',
    date: '2023-02-08',
    slug: 'future-web-dev',
  },
];

// Mock projects data
const projects: ProjectProps[] = [
  {
    id: '1',
    title: 'Personal Blog',
    description: 'A minimalist personal blog built with React and TypeScript.',
    link: 'https://github.com/kshitijanand',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  },
  {
    id: '2',
    title: 'Weather App',
    description: 'A weather application that provides real-time weather information.',
    link: 'https://github.com/kshitijanand',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b',
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with shopping cart and checkout.',
    link: 'https://github.com/kshitijanand',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c',
  },
];

// Mock bookmarks data
const bookmarks: BookmarkProps[] = [
  {
    id: '1',
    title: 'The Importance of User Testing',
    url: 'https://example.com/user-testing',
    description: 'An insightful article about how user testing can improve your product.',
    category: 'UX Research',
    imageUrl: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b',
  },
  {
    id: '2',
    title: 'Advanced CSS Techniques',
    url: 'https://example.com/css-techniques',
    description: 'Learn about the latest CSS techniques for modern web development.',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19',
  },
  {
    id: '3',
    title: 'Effective Product Management',
    url: 'https://example.com/product-management',
    description: 'Strategies for effective product management in agile environments.',
    category: 'Product Management',
    imageUrl: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83',
  },
];

// Mock POW data
const powItems: POWItemProps[] = [
  {
    id: '1',
    title: 'Innovations in AI',
    content: 'Exploring new developments in AI and machine learning that are changing the tech landscape.',
    date: '2023-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  },
  {
    id: '2',
    title: 'Design Systems at Scale',
    content: 'How to implement and maintain design systems in large organizations for consistent user experiences.',
    date: '2023-03-18',
    imageUrl: 'https://images.unsplash.com/photo-1546900703-cf06143d1239',
  },
  {
    id: '3',
    title: 'The Role of Ethics in Technology',
    content: 'Examining the ethical considerations in developing and implementing new technologies.',
    date: '2023-02-25',
    imageUrl: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c',
  },
];

// Mock CMS API methods
export const cmsService = {
  // Blog methods
  getBlogPosts: async (): Promise<BlogPostProps[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(blogPosts), 300);
    });
  },
  
  getBlogPostBySlug: async (slug: string): Promise<BlogPostProps | undefined> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = blogPosts.find(post => post.slug === slug);
        resolve(post);
      }, 300);
    });
  },
  
  // Projects methods
  getProjects: async (): Promise<ProjectProps[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(projects), 300);
    });
  },
  
  // Bookmarks methods
  getBookmarks: async (): Promise<BookmarkProps[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(bookmarks), 300);
    });
  },
  
  // POW methods
  getPOWItems: async (): Promise<POWItemProps[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(powItems), 300);
    });
  },
  
  // In a real app, you'd have methods to create, update, and delete content
  // addBlogPost, updateProject, deleteBookmark, etc.
};
