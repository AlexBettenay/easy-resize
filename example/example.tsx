import React from 'react';
import { createRoot } from 'react-dom/client';

import ExamplePage from './ExamplePage';

document.addEventListener("DOMContentLoaded", function(event) {
  const contentDiv = document.getElementById('root');
  if (!contentDiv) throw new Error('Root element not found');
  
  const root = createRoot(contentDiv);
  root.render(<ExamplePage />);
});