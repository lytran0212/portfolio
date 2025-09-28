import Navigation from '../Navigation';
import { useState } from 'react';

export default function NavigationExample() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Navigation 
      darkMode={darkMode} 
      toggleDarkMode={() => setDarkMode(!darkMode)} 
    />
  );
}