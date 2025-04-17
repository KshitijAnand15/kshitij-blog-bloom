import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      <header className="py-6 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-medium text-gray-800">
              Kshitij Anand
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="sm:hidden text-gray-800 text-2xl focus:outline-none"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              ☰
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/blog"
                    className={`hover:text-accent ${isActive('/blog') ? 'font-medium' : ''}`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pow"
                    className={`hover:text-accent ${isActive('/pow') ? 'font-medium' : ''}`}
                  >
                    POW
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className={`hover:text-accent ${isActive('/projects') ? 'font-medium' : ''}`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookmarks"
                    className={`hover:text-accent ${isActive('/bookmarks') ? 'font-medium' : ''}`}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <a
                    href="https://kshitijanand.substack.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    Newsletter
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Nav Dropdown */}
          {showMobileMenu && (
            <nav className="sm:hidden mt-4">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/blog"
                    className="block text-gray-800 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pow"
                    className="block text-gray-800 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    POW
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="block text-gray-800 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookmarks"
                    className="block text-gray-800 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <a
                    href="https://kshitijanand.substack.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-gray-800 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Newsletter
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main>
        <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
