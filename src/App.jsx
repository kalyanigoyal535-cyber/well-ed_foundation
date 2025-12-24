import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Donate = React.lazy(() => import('./pages/Donate'))
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="w-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
