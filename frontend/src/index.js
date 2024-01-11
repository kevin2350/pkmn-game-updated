// index.js

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './App';

console.warn = function() {};
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <App />
);
