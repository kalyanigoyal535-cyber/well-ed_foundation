import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Donate = React.lazy(() => import('./pages/Donate'))
const Funds = React.lazy(() => import('./pages/Funds'))
import ErrorBoundary from './components/ErrorBoundary'
import { useEffect } from "react";



function App() {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);
  

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
