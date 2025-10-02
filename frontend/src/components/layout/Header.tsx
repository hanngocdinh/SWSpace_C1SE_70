import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bell, LogOut } from 'lucide-react';
import { UserInfo } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  onGetStarted: () => void;
  onLogout: () => void;
  onLogin?: () => void;
}

export const Header = ({ isAuthenticated, userInfo, onGetStarted, onLogout, onLogin }: HeaderProps) => {
  const navigate = useNavigate();
  
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E3A8A' }}>
              <span className="text-white text-sm font-bold">SWS</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">SWSpace</h1>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors border-b-2 border-blue-600 pb-1">
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('benefits-section')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('pricing-section')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Package
            </button>
            <Link to="/booking-form" className="text-gray-700 hover:text-blue-600 transition-colors">
              Booking
            </Link>
            <button 
              onClick={() => scrollToSection('contact-section')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Hi, {userInfo.firstName}
                </span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-green-500 text-white text-xs">
                    {userInfo.firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost"
                  onClick={onLogout}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {onLogin && (
                  <Button 
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                )}
                <Button 
                  className="text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  style={{ backgroundColor: '#F59E0B' }}
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};