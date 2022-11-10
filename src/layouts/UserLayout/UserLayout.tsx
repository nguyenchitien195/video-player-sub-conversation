import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

interface UserLayoutProps {
  children: React.ReactNode;
}

// ------------------------

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <Header />
      <div className="font-roboto pt-36 sm:pt-24 min-h-[calc(100vh-96px)]">
        {children}
      </div>
      <Footer />
    </>
  );
}
