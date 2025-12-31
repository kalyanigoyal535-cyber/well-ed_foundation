import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Donate = React.lazy(() => import('./pages/Donate'))
const Funds = React.lazy(() => import('./pages/Funds'))
import ErrorBoundary from './components/ErrorBoundary'
import { testConnection } from './utils/testConnection'

function App() {
  // Test Supabase connection on app load (remove in production if not needed)
  useEffect(() => {
    // Test connection on app start
    testConnection()
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
