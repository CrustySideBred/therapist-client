import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Home.css'; 
import Client from './pages/Client';
import Session from './pages/Session';
import Therapist from './pages/Therapist';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Home page!</h1>
        </div>
    );
}

function App() {
    return (
        <Router>
            <header className="app-header">
                <nav className="navigation-bar">
                    <div className="nav-left">
                        <Link to="/">Home</Link>
                        <Link to="/Client">Client</Link>
                    </div>
                    <div className="nav-center">
                        <Link to="/" className="home-link">
                            <h1 className="app-title">Therapist-Client-Management-System</h1>
                        </Link>
                    </div>
                    <div className="nav-right">
                        <Link to="/Therapist">Therapist</Link>
                        <Link to="/Session">Session</Link>
                    </div>
                </nav>
            </header>
            
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Session" element={<Session />} />
                    <Route path="/Client" element={<Client />} />
                    <Route path="/Therapist" element={<Therapist />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
