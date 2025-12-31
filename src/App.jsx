import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Donate = React.lazy(() => import('./pages/Donate'))
const Funds = React.lazy(() => import('./pages/Funds'))
import ErrorBoundary from './components/ErrorBoundary'
import { testConnection } from './utils/testConnection'

function App() {
  // Test Supabase connection on app load (only in development, and only if configured)
  useEffect(() => {
    // Only test if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseAnonKey && import.meta.env.DEV) {
      // Test connection on app start (only in development)
      testConnection().catch((error) => {
        console.warn('Supabase connection test failed:', error)
      })
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="w-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/funds" element={<Funds />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
