import * as React from 'react';
import {createRoot} from 'react-dom/client';
import './css/styles.css'
import App from './components/App.js';

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);