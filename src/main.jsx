import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Tabs from './components/Tabs.jsx'
import config from './stores/config.js'
import experience from './stores/experience.js'
import connections from './stores/connections.js'

var rootElement;

switch(SCOPE){
    case "tabs":
        rootElement = <Tabs />;
    break;
    case "application":
        rootElement = <App />;
    break;
}

ReactDOM.render(
    rootElement,
    document.getElementById('root')
);