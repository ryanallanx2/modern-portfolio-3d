import { useEffect, useState } from "react";

/**
 * Custom hook for detecting media query matches
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);
    
    // Define a callback function to handle changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener to detect changes
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up the listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]); // Re-run the effect if the query changes
  
  return matches;
}