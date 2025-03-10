"use client";

import { useEffect } from 'react';

// This component captures and logs any console errors or warnings
// It's useful for debugging issues with 3D models and WebGL
export default function ConsoleErrorHandler() {
  useEffect(() => {
    // Store original console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Array to store errors for debugging
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Override console.error
    console.error = function(...args) {
      // Call original to maintain normal behavior
      originalConsoleError.apply(console, args);
      
      // Process the error
      try {
        // Convert to string for easier handling
        const errorMessage = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');
        
        // Add to our error log
        errors.push(errorMessage);
        
        // Filter common 3D model/WebGL errors to handle
        if (errorMessage.includes('THREE.Texture') || 
            errorMessage.includes('GLTF') || 
            errorMessage.includes('WebGL') ||
            errorMessage.includes('shader')) {
          // Here you could implement specific fixes for known errors
          console.log('3D Model Error detected:', errorMessage);
        }
      } catch (e) {
        // If there's an error processing the error, just continue
      }
    };
    
    // Override console.warn
    console.warn = function(...args) {
      // Call original to maintain normal behavior
      originalConsoleWarn.apply(console, args);
      
      // Process the warning
      try {
        // Convert to string for easier handling
        const warningMessage = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');
        
        // Add to our warning log
        warnings.push(warningMessage);
        
        // Filter common 3D model/WebGL warnings to handle
        if (warningMessage.includes('THREE') || 
            warningMessage.includes('GLTF') || 
            warningMessage.includes('WebGL')) {
          // Handle specific warnings
          console.log('3D Model Warning detected:', warningMessage);
        }
      } catch (e) {
        // If there's an error processing the warning, just continue
      }
    };
    
    // Expose the error logs to window for easier debugging
    if (typeof window !== 'undefined') {
      (window as any).__3d_model_errors = errors;
      (window as any).__3d_model_warnings = warnings;
      
      // Function to get all logs
      (window as any).get3DModelErrors = function() {
        return {
          errors: [...errors],
          warnings: [...warnings]
        };
      };
    }
    
    // Cleanup on unmount
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      
      if (typeof window !== 'undefined') {
        delete (window as any).__3d_model_errors;
        delete (window as any).__3d_model_warnings;
        delete (window as any).get3DModelErrors;
      }
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}