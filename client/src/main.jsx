import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { PostContextProvider } from './contexts/PostContext.jsx'
import { DisputeContextProvider } from './contexts/DisputeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <DisputeContextProvider>
          <App />
        </DisputeContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
