
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
                    className={`relative text-foreground hover:text-accent transition-colors duration-200 ${isActive('/blog') ? 'text-accent after:w-full' : ''}`}
                  >
                    <span>Blog</span>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ${isActive('/blog') ? 'w-full' : ''}`}></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pow" 
                    className={`relative text-foreground hover:text-accent transition-colors duration-200 ${isActive('/pow') ? 'text-accent after:w-full' : ''}`}
                  >
                    <span>POW</span>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ${isActive('/pow') ? 'w-full' : ''}`}></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    className={`relative text-foreground hover:text-accent transition-colors duration-200 ${isActive('/projects') ? 'text-accent after:w-full' : ''}`}
                  >
                    <span>Projects</span>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ${isActive('/projects') ? 'w-full' : ''}`}></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/bookmarks" 
                    className={`relative text-foreground hover:text-accent transition-colors duration-200 ${isActive('/bookmarks') ? 'text-accent after:w-full' : ''}`}
                  >
                    <span>Bookmarks</span>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ${isActive('/bookmarks') ? 'w-full' : ''}`}></span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://kshitijanand.substack.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="relative text-foreground hover:text-accent transition-colors duration-200"
                  >
                    <span>Newsletter</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
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
