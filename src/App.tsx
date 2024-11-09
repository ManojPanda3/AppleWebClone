import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from './pages';
import lazyLoadElement from './components/Intersection';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    lazyLoadElement(".load-on-scroll", (element: HTMLElement) => {
      element.style.transform = "translateY(25px)";
    },
      (element: HTMLElement) => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0px)";
      }, 250, 0.1);
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
