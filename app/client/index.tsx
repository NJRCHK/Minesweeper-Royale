import * as React from 'react';
import {createRoot} from 'react-dom/client';
import './css/styles.css'
import App from './components/App';

const rootElement = document.getElementById('root');

if(rootElement === null){
    throw "Root is null"
}

const root = createRoot(rootElement);
root.render(
    <App />
);