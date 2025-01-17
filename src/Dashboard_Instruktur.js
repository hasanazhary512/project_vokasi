import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard_Instruktur.css'; // Pastikan ini mengimpor CSS
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Dashboard_Instruktur({ onLogout }) {
    const chartRef = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Untuk mendeteksi halaman aktif

    useEffect(() => {
        const disabilitasCount = 0;
        const anakCount = 2;
        const lansiaCount = 1;
        const rentanCount = 0;
        const totalCount = 3;

        const ctx = document.getElementById('dataChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Disabilitas', 'Anak', 'Lansia', 'Rentan', 'Total'],
                datasets: [{
                    label: 'Data Kategori',
                    data: [disabilitasCount, anakCount, lansiaCount, rentanCount, totalCount],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
                    borderColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                },
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { enabled: true }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    const handleLogout = () => {
        onLogout();
        navigate('/'); // Navigasi ke halaman login setelah logout
    };

    const getLinkClass = (path) => location.pathname === path ? 'link bold' : 'link';

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link></li>
                    <li><Link to="/input-modul" className={getLinkClass('/input-modul')}>Input Modul</Link></li>
                    <li><Link to="/tampil-modul" className={getLinkClass('/tampil-modul')}>Tampil Modul</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div
                    className="navbar"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <span style={{ cursor: 'pointer' }}>Instruktur</span>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                <div className="content">
                    <div className="statistics">
                        <div className="box">Disabilitas <h1>{0}</h1></div>
                        <div className="box">Anak <h1>{2}</h1></div>
                        <div className="box">Lansia <h1>{1}</h1></div>
                        <div className="box">Rentan <h1>{0}</h1></div>
                        <div className="box">Total <h1>{3}</h1></div>
                    </div>
                    <div className="chart">
                        <canvas id="dataChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
            <footer>
                &copy; 2024 | Sistem Pelatihan Vokasi Terpadu - Surakarta
            </footer>
        </div>
    );
}

export default Dashboard_Instruktur;
