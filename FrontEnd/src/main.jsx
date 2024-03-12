import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ApiProvider from './context/ApiProvider.jsx'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApiProvider>
            <App />
            <Toaster
                toastOptions={{
                    style: {
                        justifyItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        width: 275,
                        right: 0,
                        backgroundColor: '#3662E3'
                    }
                }}
                theme='dark'
                expand={true}
                duration={1000}
            />
        </ApiProvider>
    </React.StrictMode>
)
