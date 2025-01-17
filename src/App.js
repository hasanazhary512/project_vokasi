import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Dashboard_Instruktur from './Dashboard_Instruktur';
import InputData from './InputData';
import InputModul_Instruktur from './InputModul_Instruktur';
import TampilData from './TampilData';
import TampilModul_Instruktur from './TampilModul_Instruktur';
import Dashboard_Atasan from './Dashboard_Atasan';
import TampilData_Atasan from './TampilData_Atasan';
import TampilModul_Atasan from './TampilModul_Atasan';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(''); // Menyimpan role pengguna
    const [users, setUsers] = useState([]);

    // Fungsi login sederhana
    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            setUserRole('admin');
        } else if (username === 'instruktur' && password === 'password') {
            setIsAuthenticated(true);
            setUserRole('instruktur');
        } else if (username === 'atasan' && password === 'password') { // Tambahkan login untuk atasan
            setIsAuthenticated(true);
            setUserRole('atasan');
        } else {
            alert('Username atau password salah');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(''); // Reset role saat logout
    };

    // Fungsi untuk mengambil data pengguna dari API (GET)
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost/project_vokasi_api/api.php');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Panggil fetchUsers ketika komponen dimuat jika pengguna telah login
    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers();
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated ? <Navigate to={userRole === 'admin' ? "/dashboard" : userRole === 'instruktur' ? "/dashboard-instruktur" : "/dashboard-atasan"} replace /> : <Login onLogin={handleLogin} />}
                    />
                    
                    {/* Rute untuk Admin */}
                    {userRole === 'admin' && (
                        <>
                            <Route
                                path="/dashboard"
                                element={<Dashboard onLogout={handleLogout} users={users} />}
                            />
                            <Route
                                path="/input-data"
                                element={<InputData onLogout={handleLogout} />}
                            />
                            <Route
                                path="/tampil-data"
                                element={<TampilData onLogout={handleLogout} users={users} />}
                            />
                        </>
                    )}

                    {/* Rute untuk Instruktur */}
                    {userRole === 'instruktur' && (
                        <>
                            <Route
                                path="/dashboard-instruktur"
                                element={<Dashboard_Instruktur onLogout={handleLogout} />}
                            />
                            <Route
                                path="/input-modul"
                                element={<InputModul_Instruktur onLogout={handleLogout} />}
                            />
                            <Route
                                path="/tampil-modul"
                                element={<TampilModul_Instruktur onLogout={handleLogout} />}
                            />
                        </>
                    )}

                    {/* Rute untuk Atasan */}
                    {userRole === 'atasan' && (
                        <>
                            <Route
                                path="/dashboard-atasan"
                                element={<Dashboard_Atasan onLogout={handleLogout} />}
                            />
                            <Route
                                path="/tampil-data-atasan"
                                element={<TampilData_Atasan onLogout={handleLogout} />}
                            />
                            <Route
                                path="/tampil-modul-atasan"
                                element={<TampilModul_Atasan onLogout={handleLogout} />}
                            />
                        </>
                    )}

                    {/* Jika halaman tidak ditemukan, arahkan ke halaman login */}
                    <Route
                        path="*"
                        element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
