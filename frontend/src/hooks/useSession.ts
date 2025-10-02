import { useEffect, useState } from 'react';
import { UserInfo } from '../types';

export const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedPlan: '',
    signupDate: new Date(),
    planStatus: 'inactive'
  });

  // Cookie management functions
  const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const saveSessionToCookie = (userData: UserInfo) => {
    const sessionData = {
      ...userData,
      isAuthenticated: true,
      sessionTimestamp: new Date().toISOString()
    };
    setCookie('swsspace_session', JSON.stringify(sessionData), 7);
  };

  const loadSessionFromCookie = (): boolean => {
    const sessionCookie = getCookie('swsspace_session');
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie);
        if (sessionData.isAuthenticated) {
          setUserInfo(sessionData);
          setIsAuthenticated(true);
          return true;
        }
      } catch (error) {
        console.error('Error parsing session cookie:', error);
        deleteCookie('swsspace_session');
      }
    }
    return false;
  };

  const login = (userData: UserInfo) => {
    setUserInfo(userData);
    setIsAuthenticated(true);
    saveSessionToCookie(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedPlan: '',
      signupDate: new Date(),
      planStatus: 'inactive'
    });
    deleteCookie('swsspace_session');
  };

  // Load session on mount
  useEffect(() => {
    loadSessionFromCookie();
  }, []);

  return {
    isAuthenticated,
    userInfo,
    login,
    logout
  };
};