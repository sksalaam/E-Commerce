import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'

import { Toaster } from './Components/ui/toaster.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
    </BrowserRouter>  

)
