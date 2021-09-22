import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import App from './wallpapers/Orbits';

console.log(ReactDOMServer.renderToString(<App />));
export default App;
