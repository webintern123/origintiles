import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import '../styles/globals.css'
import { CompareProvider } from '../contexts/CompareContext'
import { SavedItemsProvider } from '../contexts/SavedItemsContext'
import { RecentlyViewedProvider } from '../contexts/RecentlyViewedContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SavedItemsProvider>
      <CompareProvider>
        <RecentlyViewedProvider>
          <App />
        </RecentlyViewedProvider>
      </CompareProvider>
    </SavedItemsProvider>
  </React.StrictMode>,
)
