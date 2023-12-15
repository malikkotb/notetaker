import { useState, useEffect } from 'react';

export default function useWindowWidth() {
  // Initialize width with a default value (e.g., for SSR)
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Set the width based on the client's window
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs once on mount

  return width;
}