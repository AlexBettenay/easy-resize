import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client';

import ExamplePage from './ExamplePage';

const root = createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
  <StrictMode>
    <ExamplePage />
  </StrictMode>
)