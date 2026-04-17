import { createRoot } from 'react-dom/client'
import './app/index.css'
import { Toaster } from 'react-hot-toast'
import App from './app/App.jsx'

import { store } from './app/app.store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Toaster position="top-right" />
          <App />
    </Provider>
)