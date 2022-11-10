import { useEffect, useState } from 'react';
import BackToTopIcon from '~/assets/icon-back-to-top.png';

export default function BackToTopButton() {
  const [showIcon, setShowIcon] = useState(false);

  const handleShowIcon = () => {
    setShowIcon(document.documentElement.scrollTop > 400);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleShowIcon);
    return () => {
      window.removeEventListener('scroll', handleShowIcon);
    };
  }, []);

  return showIcon ? (
    <img
      className="fixed rounded-full bottom-12 right-12 md:bottom-24 md:right-24 cursor-pointer z-50"
      src={BackToTopIcon}
      alt="back to top"
      onClick={scrollToTop}
    />
  ) : null;
}
