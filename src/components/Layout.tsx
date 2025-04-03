
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen">
      <header className="py-8 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-medium text-gray-800">Your Name</Link>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/blog" 
                    className={`text-gray-800 hover:text-gray-600 ${isActive('/blog') ? 'bg-white shadow-sm rounded-md px-3 py-2' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pow" 
                    className={`text-gray-800 hover:text-gray-600 ${isActive('/pow') ? 'bg-white shadow-sm rounded-md px-3 py-2' : ''}`}
                  >
                    POW
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    className={`text-gray-800 hover:text-gray-600 ${isActive('/projects') ? 'bg-white shadow-sm rounded-md px-3 py-2' : ''}`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/bookmarks" 
                    className={`text-gray-800 hover:text-gray-600 ${isActive('/bookmarks') ? 'bg-white shadow-sm rounded-md px-3 py-2' : ''}`}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://kshitijanand.substack.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Newsletter
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
