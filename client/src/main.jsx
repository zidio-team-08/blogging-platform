import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                style: {
                    borderRadius: '50px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                },
            }}
        />
        <App />
    </BrowserRouter>
)
