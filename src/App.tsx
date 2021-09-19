import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import App from './wallpapers/flower-of-life';

console.log(ReactDOMServer.renderToString(<App />));
export default App;
