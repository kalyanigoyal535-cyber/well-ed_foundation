import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Donate = React.lazy(() => import('./pages/Donate'))
const Funds = React.lazy(() => import('./pages/Funds'))
import ErrorBoundary from './components/ErrorBoundary'
// import { testConnection } from './utils/testConnection' // Disabled by default - uncomment if needed

function App() {
  // Note: testConnection is disabled by default to avoid console noise
  // Uncomment the code below if you want to test Supabase connection
  // useEffect(() => {
  //   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  //   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  //   
  //   if (supabaseUrl && supabaseAnonKey && import.meta.env.DEV) {
  //     testConnection().catch((error) => {
  //       console.warn('Supabase connection test failed:', error)
  //     })
  //   }
  // }, [])

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
