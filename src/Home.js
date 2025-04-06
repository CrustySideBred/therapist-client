import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Home.css';
import Client from './pages/Client';
import Session from './pages/Session';
import Therapist from './pages/Therapist';

const Home = () => {
    return (
        <div className="Home-container">
            <h1>Therapist-Client-Management-System</h1>
        </div>
    );
}

function App() {
    return (
        <Router>
            <nav className="navigation-bar">
                <Link to="/">Home</Link>
                <Link to="/Session">Session</Link>
                <Link to="/Client">Client</Link>
                <Link to="/Therapist">Therapist</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Session" element={<Session />} />
                <Route path="/Client" element={<Client />} />
                <Route path="/Therapist" element={<Therapist />} />
            </Routes>
        </Router>
    );
}


export default App;
