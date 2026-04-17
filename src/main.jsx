import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import './app/index.css'
import App from './app/App.jsx'
import { store } from './app/app.store.js'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Toaster position="top-right" />
            <App />
    </Provider>
)