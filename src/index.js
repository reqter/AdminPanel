import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MApp from './M_App'
import * as serviceWorker from './serviceWorker'

const appName = process.env.REACT_APP_APPLICATION
//const appName = 'marketplace'

const EndpointApp = appName === 'admin' ? <App /> : <MApp />
ReactDOM.render(EndpointApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
