import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lending from './assets/components/Lending'
import './App.css'

function App() {
  const [currentMenu, setCurrentMenu] = useState('Main');

    useEffect(() => {
        localStorage.setItem('currentMenu', currentMenu);
    }, [currentMenu]);

  return (
    <>
      <Router>
        <div className="app">    
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/"
                    element={<Lending currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />}
                />
                <Route
                    path="/"
                    element={<PersonalAccount />}
                />
            </Routes>
            <FABButton />
        </div>
            </Router>
    </>
  )
}

export default App
