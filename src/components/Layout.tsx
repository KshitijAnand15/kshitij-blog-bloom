
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
    <div className="min-h-screen flex flex-col">
      <header className="py-8 border-b border-muted">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-xl font-medium">Kshitij Anand</Link>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/blog" 
                    className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pow" 
                    className={`nav-link ${isActive('/pow') ? 'active' : ''}`}
                  >
                    POW
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/bookmarks" 
                    className={`nav-link ${isActive('/bookmarks') ? 'active' : ''}`}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://kshitijanand.substack.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="nav-link"
                  >
                    Newsletter
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="content-container">
          {children}
        </div>
      </main>
      
      <footer className="py-8 border-t border-muted">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kshitij Anand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
