// Dark Mode Toggle Script
(function() {
  const htmlElement = document.documentElement;
  const themeKey = 'zannime-theme';
  
  // Get saved theme preference or use system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  // Set theme on page load (before content renders to prevent flashing)
  const initialTheme = getInitialTheme();
  if (initialTheme === 'dark') {
    htmlElement.setAttribute('data-bs-theme', 'dark');
  }
  
  // Toggle theme function
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-bs-theme');
    }
    
    localStorage.setItem(themeKey, newTheme);
    updateToggleIcon();
  }
  
  // Update toggle button text
  function updateToggleIcon() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
    if (currentTheme === 'dark') {
      toggle.textContent = 'Light Mode';
      toggle.title = 'Switch to Light Mode';
    } else {
      toggle.textContent = 'Dark Mode';
      toggle.title = 'Switch to Dark Mode';
    }
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const toggle = document.getElementById('theme-toggle');
      if (toggle) {
        toggle.addEventListener('click', toggleTheme);
        updateToggleIcon();
      }
    });
  } else {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
      updateToggleIcon();
    }
  }
  
  // Listen to system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(themeKey)) {
        toggleTheme();
      }
    });
  }
})();
